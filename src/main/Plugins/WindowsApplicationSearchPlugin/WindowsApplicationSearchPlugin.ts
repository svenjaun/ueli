import { SearchResultItem } from "../../../common/SearchResultItem";
import { Application } from "./Application";
import { ApplicationSearchPreferences } from "./ApplicationSearchPreferences";
import { WindowsApplicationRetrieverResult } from "./WindowsApplicationRetrieverResult";
import { SearchPlugin } from "../SearchPlugin";

export class WindowsApplicationSearchPlugin implements SearchPlugin {
    public constructor(
        private readonly executePowershellScript: (powershellScript: string) => Promise<string>,
        private readonly applicationSearchPreferences: ApplicationSearchPreferences
    ) {}

    public async getAllItems(): Promise<SearchResultItem[]> {
        return (await this.getApplications()).map((application) => application.toSearchResultItem());
    }

    private async getApplications(): Promise<Application[]> {
        const stdout = await this.executePowershellScript(this.getPowershellScript());
        const apps = JSON.parse(stdout) as WindowsApplicationRetrieverResult[];
        return apps.map((app) => Application.fromWindowsAppRetriever(app));
    }

    private getPowershellScript(): string {
        return `
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
                        $Icon = [System.Drawing.Icon]::ExtractAssociatedIcon($File.FullName);
                        if ($Icon -ne $null) {
                            $Icon.ToBitmap().Save($File.IconFilePath, [System.Drawing.Imaging.ImageFormat]::Png)
                        }
                    }
                }
                        
                $Files | ConvertTo-Json
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
