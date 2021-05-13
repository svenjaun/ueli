import { ApplicationRuntimeInformation } from "../../ApplicationRuntimeInformation";
import { FileIconUtility } from "../../Utilities/FileIconUtility";
import { FileSystemUtility } from "../../Utilities/FileSystemUtility";
import { SearchPlugin } from "../SearchPlugin";
import { SimpleFolderSearchItem } from "./SimpleFolderSearchItem";
import { SimpleFolderSearchResultItem } from "./SimpleFolderSearchResultItem";

export class SimpleFolderSearchPlugin extends SearchPlugin<unknown> {
    public readonly pluginId = "SimpleFolderSearchPlugin";
    protected readonly defaultSettings = {};

    private items: SimpleFolderSearchItem[];

    public constructor(applicationRuntimeInformation: ApplicationRuntimeInformation) {
        super(applicationRuntimeInformation);
        this.items = [];
    }

    public clearCache(): Promise<void> {
        return Promise.resolve();
    }

    public async rescan(): Promise<void> {
        const filePaths = await FileSystemUtility.getFolderItems(this.applicationRuntimeInformation.userHomePath);
        this.items = await Promise.all(filePaths.map((filePath) => this.getIcon(filePath)));
    }

    public getAllSearchables(): SimpleFolderSearchResultItem[] {
        return this.items.map((file) => new SimpleFolderSearchResultItem(file.filePath, file.iconDataUrl));
    }

    private async getIcon(filePath: string): Promise<SimpleFolderSearchItem> {
        return {
            filePath,
            iconDataUrl: await FileIconUtility.getIconDataUrlFromFilePath(filePath),
        };
    }
}
