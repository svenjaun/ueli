import { WindowsApplication } from "./WindowsApplication";
import { WindowsApplicationSearchPreferences } from "./WindowsApplicationSearchPreferences";
import { WindowsApplicationRetrieverResult } from "./WindowsApplicationRetrieverResult";
import { SearchPlugin } from "../SearchPlugin";

export class WindowsApplicationSearchPlugin implements SearchPlugin {
    private applications: WindowsApplication[];

    public constructor(
        private readonly executePowershellScript: (powershellScript: string) => Promise<string>,
        private readonly applicationSearchPreferences: WindowsApplicationSearchPreferences
    ) {
        this.applications = [];
    }

    public getAllItems(): WindowsApplication[] {
        return this.applications;
    }

    public async rescan(): Promise<void> {
        const stdout = await this.executePowershellScript(this.getPowershellScript());
        const apps = JSON.parse(stdout) as WindowsApplicationRetrieverResult[];
        this.applications = apps.map((app) => WindowsApplication.fromWindowsAppRetriever(app));
    }

    public async clearCache(): Promise<void> {
        try {
            await this.executePowershellScript(`Remove-Item '${this.getAppIconFolder()}\\*'`);
        } catch (error) {
            throw new Error(`WindowsApplicationSearchPlugin failed to clear cache. Reason: ${error}`);
        }
    }

    private getPowershellScript(): string {
        return `
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

            Get-WindowsApps -FolderPaths ${this.getFolderPathFilter()} -FileExtensions ${this.getFileExtensionFilter()} -AppIconFolder ${this.getAppIconFolder()}
        `;
    }

    private getFolderPathFilter(): string {
        return this.applicationSearchPreferences.folderPaths.map((folderPath) => `'${folderPath}'`).join(",");
    }

    private getFileExtensionFilter(): string {
        return this.applicationSearchPreferences.fileExtensions
            .map((fileExtension) => `'*.${fileExtension}'`)
            .join(",");
    }

    private getAppIconFolder(): string {
        return "C:\\Users\\Oliver\\AppData\\Roaming\\ueli\\appicons";
    }
}
