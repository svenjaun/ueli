import { SearchResultItem } from "./SearchResultItem";

export class SearchResultItemDummy {
    public static empty(): SearchResultItem {
        return {
            description: "",
            executionArgument: "",
            executorId: "",
            icon: "",
            locationOpenerId: "",
            name: "",
            openLocationArgument: "",
        };
    }

    public static withExecutorId(executorId: string): SearchResultItem {
        const empty = this.empty();
        empty.executorId = executorId;
        return empty;
    }
}
