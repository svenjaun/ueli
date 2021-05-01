import { SearchResultItem } from "../../../common/SearchResultItem";
import { Searchable } from "../../Core/Searchable";

export class SimpleFolderSearchResultItem implements Searchable {
    public toSearchResultItem(): SearchResultItem {
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
}
