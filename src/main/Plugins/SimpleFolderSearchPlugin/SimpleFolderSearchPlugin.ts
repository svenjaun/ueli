import { ApplicationRuntimeInformation } from "../../ApplicationRuntimeInformation";
import { SearchPlugin } from "../SearchPlugin";
import { SimpleFolderSearchResultItem } from "./SimpleFolderSearchResultItem";

export class SimpleFolderSearchPlugin extends SearchPlugin {
    public constructor(applicationRuntimeInformation: ApplicationRuntimeInformation) {
        super("SimpleFolderSearchPlugin", applicationRuntimeInformation);
    }

    public clearCache(): Promise<void> {
        return Promise.resolve();
    }

    public rescan(): Promise<void> {
        return Promise.resolve();
    }

    public getAllItems(): SimpleFolderSearchResultItem[] {
        return [];
    }
}
