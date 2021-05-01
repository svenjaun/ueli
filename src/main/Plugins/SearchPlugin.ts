import { join } from "path";
import { ApplicationRuntimeInformation } from "../ApplicationRuntimeInformation";
import { Searchable } from "../Core/Searchable";

export abstract class SearchPlugin {
    public abstract getAllItems(): Searchable[];
    public abstract rescan(): Promise<void>;
    public abstract clearCache(): Promise<void>;

    protected constructor(
        public readonly PluginId: string,
        protected readonly applicationRuntimeInformation: ApplicationRuntimeInformation
    ) {}

    public getTemporaryFolderPath(): string {
        return join(this.applicationRuntimeInformation.userDataPath, this.PluginId);
    }
}
