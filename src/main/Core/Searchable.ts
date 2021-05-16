import { SearchResultItem } from "../../common/SearchResult/SearchResultItem";

export interface Searchable {
    toSearchResultItem(): SearchResultItem;
}
