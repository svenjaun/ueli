import { ApplicationRuntimeInformation } from "../ApplicationRuntimeInformation";
import { PluginRepository } from "./PluginRepository";
import { SearchPlugin } from "../Plugins/SearchPlugin";
import { WindowsApplicationSearchPlugin } from "../Plugins/WindowsApplicationSearchPlugin/WindowsApplicationSearchPlugin";
import { PowershellUtility } from "../Utilities/PowershellUtility";

export class WindowsPluginRepository extends PluginRepository {
    public constructor(applicationRuntimeInformation: ApplicationRuntimeInformation) {
        super(applicationRuntimeInformation);
    }

    protected getOperatingSystemSpecificPlugins(): SearchPlugin<unknown>[] {
        return [
            new WindowsApplicationSearchPlugin(this.applicationRuntimeInformation, (powershellScript) =>
                PowershellUtility.executePowershellScript(powershellScript)
            ),
        ];
    }
}
