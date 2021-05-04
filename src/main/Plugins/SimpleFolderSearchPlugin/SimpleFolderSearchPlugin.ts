import { ApplicationRuntimeInformation } from "../../ApplicationRuntimeInformation";
import { FileIconUtility } from "../../Utilities/FileIconUtility";
import { FileSystemUtility } from "../../Utilities/FileSystemUtility";
import { SearchPlugin } from "../SearchPlugin";
import { SimpleFolderSearchResultItem } from "./SimpleFolderSearchResultItem";

export class SimpleFolderSearchPlugin extends SearchPlugin {
    public readonly pluginId = "SimpleFolderSearchPlugin";

    private files: { filePath: string; icon: string }[];

    public constructor(applicationRuntimeInformation: ApplicationRuntimeInformation) {
        super(applicationRuntimeInformation);
        this.files = [];
    }

    public clearCache(): Promise<void> {
        return Promise.resolve();
    }

    public async rescan(): Promise<void> {
        const filePaths = await FileSystemUtility.getFolderItems(this.applicationRuntimeInformation.userHomePath);
        this.files = await Promise.all(filePaths.map((filePath) => this.getIcon(filePath)));
    }

    public getAllItems(): SimpleFolderSearchResultItem[] {
        return this.files.map(
            (file): SimpleFolderSearchResultItem => new SimpleFolderSearchResultItem(file.filePath, file.icon)
        );
    }

    private async getIcon(filePath: string): Promise<{ filePath: string; icon: string }> {
        return {
            filePath,
            icon: await FileIconUtility.getIconDataUrlFromFilePath(filePath),
        };
    }
}
