import { ApplicationRuntimeInformation } from "./ApplicationRuntimeInformation";
import { PluginRepository } from "./PluginRepository";
import { SearchPlugin } from "./Plugins/SearchPlugin";
import { WindowsApplicationSearchPlugin } from "./Plugins/WindowsApplicationSearchPlugin/WindowsApplicationSearchPlugin";
import { PowershellUtility } from "./Utilities/PowershellUtility";

export class WindowsPluginRepository extends PluginRepository {
    public constructor(applicationRuntimeInformation: ApplicationRuntimeInformation) {
        super(applicationRuntimeInformation);
    }

    protected getOperatingSystemSpecificPlugins(): SearchPlugin[] {
        return [
            new WindowsApplicationSearchPlugin(
                this.applicationRuntimeInformation,
                (powershellScript) => PowershellUtility.executePowershellScript(powershellScript),
                {
                    folderPaths: [
                        "C:\\ProgramData\\Microsoft\\Windows\\Start Menu",
                        "C:\\Users\\Oliver\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu",
                    ],
                    fileExtensions: ["lnk"],
                }
            ),
        ];
    }
}
