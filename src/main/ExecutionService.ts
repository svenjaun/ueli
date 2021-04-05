import { SearchResultItem } from "../common/SearchResultItem";
import { Executor } from "./Executor";

export class ExecutionService {
    constructor(private readonly executors: Executor[]) {}

    public execute(searchResultItem: SearchResultItem): Promise<void> {
        const executor = this.executors.find((executor) => executor.executorId === searchResultItem.executorId);

        if (executor) {
            return executor.execute(searchResultItem);
        }

        throw new Error("Can't execute search result item. Reason: no executor found which can handle the item.");
    }
}
