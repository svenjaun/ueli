import { DummySearchResultItemIcon } from "./DummySearchResultItemIcon";
import { SearchResultItem } from "./SearchResultItem";

export class SearchResultItemDummy {
    public static empty({
        description = "",
        executionArgument = "",
        executorId = "",
        icon = "",
        locationOpenerId = "",
        name = "",
        openLocationArgument = "",
    } = {}): SearchResultItem {
        return {
            description,
            executionArgument,
            executorId,
            icon: new DummySearchResultItemIcon(icon),
            locationOpenerId,
            name,
            openLocationArgument,
        };
    }

    public static withName(name: string): SearchResultItem {
        return SearchResultItemDummy.empty({ name });
    }

    public static withExecutorId(executorId: string): SearchResultItem {
        return SearchResultItemDummy.empty({ executorId });
    }

    public static withLocationOpenerId(locationOpenerId: string): SearchResultItem {
        return SearchResultItemDummy.empty({ locationOpenerId });
    }
}
