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

    public static withName(name: string): SearchResultItem {
        const empty = SearchResultItemDummy.empty();
        empty.name = name;
        return empty;
    }

    public static withExecutorId(executorId: string): SearchResultItem {
        const empty = SearchResultItemDummy.empty();
        empty.executorId = executorId;
        return empty;
    }

    public static withLocationOpenerId(locationOpenerId: string): SearchResultItem {
        const empty = SearchResultItemDummy.empty();
        empty.locationOpenerId = locationOpenerId;
        return empty;
    }
}
