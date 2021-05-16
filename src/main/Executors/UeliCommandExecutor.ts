import { IpcMain } from "electron";
import { IpcChannel } from "../../common/IpcChannel";
import { SearchResultItem } from "../../common/SearchResult/SearchResultItem";
import { Executor } from "./Executor";

export class UeliCommandExecutor extends Executor {
    public static readonly executorId = "UeliCommandExecutor";

    public constructor(private readonly ipcMain: IpcMain) {
        super(UeliCommandExecutor.executorId);
    }

    public execute(searchResultItem: SearchResultItem): Promise<void> {
        this.ipcMain.emit(IpcChannel.UeliCommandEvent, undefined, searchResultItem.executionArgument);
        return Promise.resolve();
    }
}
