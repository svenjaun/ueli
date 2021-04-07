import { SearchResultItem } from "../../common/SearchResultItem";

export interface SearchPlugin {
    getAllItems(): Promise<SearchResultItem[]>;
}
