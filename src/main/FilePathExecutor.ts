import { SearchResultItem } from "../common/SearchResultItem";
import { Executor } from "./Executor";

export class FilePathExecutor extends Executor {
    public constructor(private readonly pathOpener: (filePath: string) => Promise<void>) {
        super("FilePathExecutor");
    }
    public execute(searchResultItem: SearchResultItem): Promise<void> {
        return this.pathOpener(searchResultItem.executionArgument);
    }
}
