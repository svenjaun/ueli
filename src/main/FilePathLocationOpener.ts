import { SearchResultItem } from "../common/SearchResultItem";
import { LocationOpener } from "./LocationOpener";

export class FilePathLocationOpener extends LocationOpener {
    public static readonly locationOpenerId = "FilePathLocationOpener";

    public constructor(private readonly locationOpener: (filePath: string) => Promise<void>) {
        super(FilePathLocationOpener.locationOpenerId);
    }

    public openLocation(searchResultItem: SearchResultItem): Promise<void> {
        return this.locationOpener(searchResultItem.openLocationArgument);
    }
}
