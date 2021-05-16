import { SearchResultItem } from "../../common/SearchResult/SearchResultItem";
import { Executor } from "../Executors/Executor";

export class ExecutionService {
    constructor(private readonly executors: Executor[]) {}

    public execute(searchResultItem: SearchResultItem): Promise<void> {
        const executor = this.executors.find((executor) => executor.executorId === searchResultItem.executorId);

        return executor
            ? executor.execute(searchResultItem)
            : Promise.reject(`Can't execute "${searchResultItem.executionArgument}". Reason: no executor found.`);
    }
}
