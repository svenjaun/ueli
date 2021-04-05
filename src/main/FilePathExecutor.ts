import { shell } from "electron";
import { SearchResultItem } from "../common/SearchResultItem";
import { Executor } from "./Executor";

export class FilePathExecutor extends Executor {
    public constructor() {
        super("FilePathExecutor");
    }
    public execute(searchResultItem: SearchResultItem): Promise<void> {
        return new Promise((resolve, reject) => {
            shell
                .openPath(searchResultItem.executionArgument)
                .then((returnValue) => (returnValue === "" ? resolve() : reject(returnValue)))
                .catch((error) => reject(error));
        });
    }
}
