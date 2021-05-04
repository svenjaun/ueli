import { basename } from "path";
import { SearchResultItem } from "../../../common/SearchResultItem";
import { Searchable } from "../../Core/Searchable";
import { FilePathExecutor } from "../../Executors/FilePathExecutor";
import { FilePathLocationOpener } from "../../LocationOpeners/FilePathLocationOpener";

export class SimpleFolderSearchResultItem implements Searchable {
    public constructor(private readonly filePath: string, private readonly icon: string) {}

    public toSearchResultItem(): SearchResultItem {
        return {
            description: this.filePath,
            executionArgument: this.filePath,
            executorId: FilePathExecutor.executorId,
            icon: this.icon,
            locationOpenerId: FilePathLocationOpener.locationOpenerId,
            name: basename(this.filePath),
            openLocationArgument: this.filePath,
        };
    }
}
