import { SearchResultItem } from "../common/SearchResultItem";
import { FilePathExecutor } from "./FilePathExecutor";
import { FilePathLocationOpener } from "./FilePathLocationOpener";
import { WindowsApplicationRetrieverResult } from "./WindowsApplicationRetrieverResult";

export class Application {
    public static fromWindowsAppRetriever(app: WindowsApplicationRetrieverResult): Application {
        return new Application(app.BaseName, app.FullName);
    }

    private constructor(public readonly name: string, public readonly filePath: string) {}

    public toSearchResultItem(): SearchResultItem {
        return {
            description: this.filePath,
            executionArgument: this.filePath,
            executorId: FilePathExecutor.executorId,
            icon: "https://img.icons8.com/color/2x/desktop-mac.png",
            locationOpenerId: FilePathLocationOpener.locationOpenerId,
            name: this.name,
            openLocationArgument: this.filePath,
        };
    }
}
