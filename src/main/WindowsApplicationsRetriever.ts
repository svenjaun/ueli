import { Application } from "./Application";
import { ApplicationSearchPreferences } from "./ApplicationSearchPreferences";
import { WindowsApplicationRetrieverResult } from "./WindowsApplicationRetrieverResult";

export class WindowsApplicationsRetriever {
    public constructor(
        private readonly executePowershellScript: (powershellScript: string) => Promise<string>,
        private readonly applicationSearchPreferences: ApplicationSearchPreferences
    ) {}

    public getApps(): Promise<Application[]> {
        return new Promise((resolve, reject) => {
            const folderPathFilter = this.applicationSearchPreferences.folderPaths
                .map((folderPath) => `'${folderPath}'`)
                .join(",");

            const fileExtensionFilter = this.applicationSearchPreferences.fileExtensions
                .map((fileExtension) => `'*.${fileExtension}'`)
                .join(",");

            this.executePowershellScript(
                `Get-ChildItem -File -Path ${folderPathFilter} -Recurse -Include ${fileExtensionFilter} | Select-Object -Property Name, FullName, Extension, BaseName | ConvertTo-Json`
            )
                .then((stdout) => {
                    const apps = JSON.parse(stdout) as WindowsApplicationRetrieverResult[];
                    resolve(apps.map((app) => Application.fromWindowsAppRetriever(app)));
                })
                .catch((error) => reject(error));
        });
    }
}
