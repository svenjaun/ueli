import { SearchResultItem } from "../common/SearchResultItem";

export class SearchEngine {
    constructor(private searchResultItems: SearchResultItem[]) {}

    public search(searchTerm: string): Promise<SearchResultItem[]> {
        if (searchTerm.trim().length === 0) {
            return Promise.resolve([]);
        }

        return Promise.resolve(
            this.searchResultItems.filter((searchResultItem) => {
                return searchResultItem.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
            })
        );
    }
}
