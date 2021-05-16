import { ApplicationRuntimeInformation } from "../ApplicationRuntimeInformation";
import { PluginRepository } from "./PluginRepository";
import { SearchPlugin } from "../Plugins/SearchPlugin";

export class MacOsPluginRepository extends PluginRepository {
    public constructor(applicationRuntimeInformation: ApplicationRuntimeInformation) {
        super(applicationRuntimeInformation);
    }

    protected getOperatingSystemSpecificPlugins(): SearchPlugin<unknown>[] {
        return [];
    }
}
