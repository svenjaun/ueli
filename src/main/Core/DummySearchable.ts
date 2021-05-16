import { SearchResultItem } from "../../common/SearchResult/SearchResultItem";
import { Searchable } from "./Searchable";

export class DummySearchable implements Searchable {
    public constructor(private readonly searchResultItem: SearchResultItem) {}

    public toSearchResultItem(): SearchResultItem {
        return this.searchResultItem;
    }
}
