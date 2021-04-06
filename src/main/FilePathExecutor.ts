import { SearchResultItem } from "../common/SearchResultItem";
import { Executor } from "./Executor";

export class FilePathExecutor extends Executor {
    public static readonly executorId = "FilePathExecutor";

    public constructor(private readonly openPath: (filePath: string) => Promise<void>) {
        super(FilePathExecutor.executorId);
    }

    public execute(searchResultItem: SearchResultItem): Promise<void> {
        return this.openPath(searchResultItem.executionArgument);
    }
}
