import { basename } from "path";
import { DataUrlSearchResultItemIcon } from "../../../common/SearchResult/DataUrlSearchResultItemIcon";
import { SearchResultItem } from "../../../common/SearchResult/SearchResultItem";
import { Searchable } from "../../Core/Searchable";
import { FilePathExecutor } from "../../Executors/FilePathExecutor";
import { FilePathLocationOpener } from "../../LocationOpeners/FilePathLocationOpener";

export class SimpleFolderSearchResultItem implements Searchable {
    public constructor(private readonly filePath: string, private readonly imageDataUrl: string) {}

    public toSearchResultItem(): SearchResultItem {
        return {
            description: this.filePath,
            executionArgument: this.filePath,
            executorId: FilePathExecutor.executorId,
            icon: new DataUrlSearchResultItemIcon(this.imageDataUrl),
            locationOpenerId: FilePathLocationOpener.locationOpenerId,
            name: basename(this.filePath),
            openLocationArgument: this.filePath,
        };
    }
}
