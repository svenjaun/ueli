import { SearchResultItem } from "../../../common/SearchResultItem";
import { FilePathExecutor } from "../../FilePathExecutor";
import { FilePathLocationOpener } from "../../FilePathLocationOpener";
import { WindowsApplicationRetrieverResult } from "./WindowsApplicationRetrieverResult";

export class Application {
    public static fromWindowsAppRetriever(app: WindowsApplicationRetrieverResult): Application {
        return new Application(app.BaseName, app.FullName, app.IconFilePath);
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
            icon: this.iconFilePath,
            locationOpenerId: FilePathLocationOpener.locationOpenerId,
            name: this.name,
            openLocationArgument: this.filePath,
        };
    }
}
