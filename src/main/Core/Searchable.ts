import { SearchResultItem } from "../../common/SearchResultItem";

export interface Searchable {
    toSearchResultItem(): SearchResultItem;
}
