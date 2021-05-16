import { ApplicationRuntimeInformation } from "../ApplicationRuntimeInformation";
import { SearchPlugin } from "../Plugins/SearchPlugin";
import { SimpleFolderSearchPlugin } from "../Plugins/SimpleFolderSearchPlugin/SimpleFolderSearchPlugin";
import { UeliCommandsPlugin } from "../Plugins/UeliCommandsPlugin/UeliCommandsPlugin";

export abstract class PluginRepository {
    protected abstract getOperatingSystemSpecificPlugins(): SearchPlugin<unknown>[];

    protected constructor(protected readonly applicationRuntimeInformation: ApplicationRuntimeInformation) {}

    protected getCommonPlugins(): SearchPlugin<unknown>[] {
        return [
            new SimpleFolderSearchPlugin(this.applicationRuntimeInformation),
            new UeliCommandsPlugin(this.applicationRuntimeInformation),
        ];
    }

    public getAllPlugins(): SearchPlugin<unknown>[] {
        return this.getCommonPlugins().concat(this.getOperatingSystemSpecificPlugins());
    }
}
