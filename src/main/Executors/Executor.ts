import { SearchResultItem } from "../../common/SearchResult/SearchResultItem";

export abstract class Executor {
    protected constructor(public readonly executorId: string) {}
    public abstract execute(searchResultItem: SearchResultItem): Promise<void>;
}
