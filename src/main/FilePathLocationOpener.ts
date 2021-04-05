import { shell } from "electron";
import { SearchResultItem } from "../common/SearchResultItem";
import { LocationOpener } from "./LocationOpener";

export class FilePathLocationOpener extends LocationOpener {
    public constructor() {
        super("FileLocationOpener");
    }

    public openLocation(searchResultItem: SearchResultItem): Promise<void> {
        try {
            shell.showItemInFolder(searchResultItem.openLocationArgument);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(
                `Unable to open file path location ${searchResultItem.openLocationArgument}. Reason: ${error}`
            );
        }
    }
}
