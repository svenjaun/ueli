import { join } from "path";
import { ApplicationRuntimeInformation } from "../ApplicationRuntimeInformation";
import { Searchable } from "../Core/Searchable";

export abstract class SearchPlugin {
    public abstract readonly pluginId: string;

    public abstract getAllItems(): Searchable[];
    public abstract rescan(): Promise<void>;
    public abstract clearCache(): Promise<void>;

    protected constructor(protected readonly applicationRuntimeInformation: ApplicationRuntimeInformation) {}

    public getTemporaryFolderPath(): string {
        return join(this.applicationRuntimeInformation.userDataPath, this.pluginId);
    }
}
