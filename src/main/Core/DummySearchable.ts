import { SearchResultItem } from "../../common/SearchResultItem";
import { Searchable } from "./Searchable";

export class DummySearchable implements Searchable {
    public constructor(private readonly searchResultItem: SearchResultItem) {}

    public toSearchResultItem(): SearchResultItem {
        return this.searchResultItem;
    }
}
