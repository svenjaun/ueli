import { Shell } from "electron";
import { SearchResultItem } from "../common/SearchResultItem";
import { LocationOpener } from "./LocationOpener";

export class FilePathLocationOpener extends LocationOpener {
    public constructor(private readonly electronShell: Shell) {
        super("FileLocationOpener");
    }

    public openLocation(searchResultItem: SearchResultItem): Promise<void> {
        try {
            this.electronShell.showItemInFolder(searchResultItem.openLocationArgument);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(
                `Unable to open file path location ${searchResultItem.openLocationArgument}. Reason: ${error}`
            );
        }
    }
}
