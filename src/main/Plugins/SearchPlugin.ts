import { join } from "path";
import { ApplicationRuntimeInformation } from "../ApplicationRuntimeInformation";
import { Searchable } from "../Core/Searchable";
import { FileSystemUtility } from "../Utilities/FileSystemUtility";

export abstract class SearchPlugin {
    public abstract readonly pluginId: string;

    public abstract getAllSearchables(): Searchable[];
    public abstract rescan(): Promise<void>;
    public abstract clearCache(): Promise<void>;

    protected constructor(protected readonly applicationRuntimeInformation: ApplicationRuntimeInformation) {}

    public getTemporaryFolderPath(): string {
        return join(this.applicationRuntimeInformation.userDataPath, this.pluginId);
    }

    public async createTemporaryFolder(): Promise<void> {
        return FileSystemUtility.createFolderIfDoesntExist(this.getTemporaryFolderPath());
    }
}
