import { LocalFilePathSearchResultItemIcon } from "../../../common/SearchResult/LocalFilePathSearchResultItemIcon";
import { SearchResultItem } from "../../../common/SearchResult/SearchResultItem";
import { Searchable } from "../../Core/Searchable";
import { FilePathExecutor } from "../../Executors/FilePathExecutor";
import { FilePathLocationOpener } from "../../LocationOpeners/FilePathLocationOpener";
import { WindowsApplicationRetrieverResult } from "./WindowsApplicationRetrieverResult";

export class WindowsApplication implements Searchable {
    public static fromWindowsAppRetriever(app: WindowsApplicationRetrieverResult): WindowsApplication {
        return new WindowsApplication(app.BaseName, app.FullName, app.IconFilePath);
    }

    private constructor(
        public readonly name: string,
        public readonly filePath: string,
        public readonly iconFilePath: string
    ) {}

    public toSearchResultItem(): SearchResultItem {
        return {
            description: this.filePath,
            executionArgument: this.filePath,
            executorId: FilePathExecutor.executorId,
            icon: new LocalFilePathSearchResultItemIcon(this.iconFilePath),
            locationOpenerId: FilePathLocationOpener.locationOpenerId,
            name: this.name,
            openLocationArgument: this.filePath,
        };
    }
}
