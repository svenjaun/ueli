import { WindowsApplication } from "./WindowsApplication";
import { WindowsApplicationSearchSettings } from "./WindowsApplicationSearchSettings";
import { WindowsApplicationRetrieverResult } from "./WindowsApplicationRetrieverResult";
import { SearchPlugin } from "../SearchPlugin";
import { ApplicationRuntimeInformation } from "../../ApplicationRuntimeInformation";
import { join } from "path";

export class WindowsApplicationSearchPlugin extends SearchPlugin<WindowsApplicationSearchSettings> {
    private static readonly extractShortcutPowershellScript = `
        function Extract-Shortcut {
            param(
                [string]$ShortcutFilePath
            )

            try {
                $Shell = New-Object -ComObject WScript.Shell
                $TargetPath = $Shell.CreateShortcut($ShortcutFilePath).TargetPath
                $TargetPathAccessible = Test-Path -Path $TargetPath -PathType Leaf
                if ($TargetPathAccessible) {
                    return $TargetPath;
                }
                else {
                    return $ShortcutFilePath
                }
            }
            catch {
                return $ShortcutFilePath
            }
        }
    `;

    private static readonly getWindowsAppsPowershellScript = `
        function Get-WindowsApps {
            param(
                [string[]]$FolderPaths,
                [string[]]$FileExtensions,
                [string]$AppIconFolder
            )

            Add-Type -AssemblyName System.Drawing

            $Utf8 = New-Object -TypeName System.Text.UTF8Encoding

            $Files = Get-ChildItem -File -Path $FolderPaths -Recurse -Include $FileExtensions | Select-Object -Property Name, FullName, Extension, BaseName

            foreach ($File in $Files) {
                $Stream = [System.IO.MemoryStream]::new($Utf8.GetBytes($File.FullName))
                $Hash = Get-FileHash -Algorithm MD5 -InputStream $Stream | Select-Object -ExpandProperty Hash
                $IconFilePath = "$($AppIconFolder)\\$($Hash).png"
                $File | Add-Member -MemberType NoteProperty -Name "IconFilePath" -Value $IconFilePath

                $IconAlreadyExists = Test-Path -LiteralPath $File.IconFilePath

                if (!$IconAlreadyExists) {
                    $FilePathToExtractIcon = $File.FullName

                    if ($File.Extension -eq ".lnk") {
                        $FilePathToExtractIcon = Extract-Shortcut -ShortcutFilePath $File.FullName
                    }

                    $Icon = [System.Drawing.Icon]::ExtractAssociatedIcon($FilePathToExtractIcon);
                    if ($Icon -ne $null) {
                        $Icon.ToBitmap().Save($File.IconFilePath, [System.Drawing.Imaging.ImageFormat]::Png)
                    }
                }
            }

            $Files | ConvertTo-Json -Compress
        }
    `;

    public readonly pluginId = "WindowsApplicationSearchPlugin";
    protected readonly defaultSettings: WindowsApplicationSearchSettings;
    private applications: WindowsApplication[];

    public constructor(
        applicationRuntimeInformation: ApplicationRuntimeInformation,
        private readonly executePowershellScript: (powershellScript: string) => Promise<string>
    ) {
        super(applicationRuntimeInformation);

        this.defaultSettings = {
            folderPaths: [
                "C:\\ProgramData\\Microsoft\\Windows\\Start Menu",
                join(
                    applicationRuntimeInformation.userHomePath,
                    "AppData",
                    "Roaming",
                    "Microsoft",
                    "Windows",
                    "Start Menu"
                ),
            ],
            fileExtensions: ["lnk"],
        };

        this.applications = [];
    }

    public getAllSearchables(): WindowsApplication[] {
        return this.applications;
    }

    public async rescan(): Promise<void> {
        const settings = await this.getSettings();
        const stdout = await this.executePowershellScript(this.getPowershellScript(settings));
        const apps = JSON.parse(stdout) as WindowsApplicationRetrieverResult[];
        this.applications = apps.map((app) => WindowsApplication.fromWindowsAppRetriever(app));
    }

    public async clearCache(): Promise<void> {
        try {
            await this.executePowershellScript(`Remove-Item '${this.getTemporaryFolderPath()}\\*.png'`);
        } catch (error) {
            throw new Error(`WindowsApplicationSearchPlugin failed to clear cache. Reason: ${error}`);
        }
    }

    private getPowershellScript(settings: WindowsApplicationSearchSettings): string {
        const folderPaths = this.getFolderPathFilter(settings.folderPaths);
        const fileExtensions = this.getFileExtensionFilter(settings.fileExtensions);
        const tempFolderPath = this.getTemporaryFolderPath();

        return `
            ${WindowsApplicationSearchPlugin.extractShortcutPowershellScript}
            ${WindowsApplicationSearchPlugin.getWindowsAppsPowershellScript}
            Get-WindowsApps -FolderPaths ${folderPaths} -FileExtensions ${fileExtensions} -AppIconFolder ${tempFolderPath}
        `;
    }

    private getFolderPathFilter(folderPaths: string[]): string {
        return folderPaths.map((folderPath) => `'${folderPath}'`).join(",");
    }

    private getFileExtensionFilter(fileExtensions: string[]): string {
        return fileExtensions.map((fileExtension) => `'*.${fileExtension}'`).join(",");
    }
}
