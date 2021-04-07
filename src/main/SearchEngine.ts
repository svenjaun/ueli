import { SearchResultItem } from "../common/SearchResultItem";
import { SearchPlugin } from "./Plugins/SearchPlugin";

export class SearchEngine {
    private searchResultItems: SearchResultItem[];

    constructor(private readonly searchPlugins: SearchPlugin[]) {
        this.searchResultItems = [];

        this.getUpdatedSearchResultItems()
            .then((updatedSearchResultItems) => (this.searchResultItems = updatedSearchResultItems))
            .catch((error) => console.log(`Failed to update search result items. Reason: ${error}`));
    }

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

    private getUpdatedSearchResultItems(): Promise<SearchResultItem[]> {
        return new Promise((resolve, reject) => {
            Promise.all(this.searchPlugins.map((searchPlugin) => searchPlugin.getAllItems()))
                .then((searchResultItemsList) => {
                    let searchResultItems: SearchResultItem[] = [];

                    searchResultItemsList.forEach((searchResultItemList) => {
                        searchResultItems = searchResultItems.concat(searchResultItemList);
                    });

                    resolve(searchResultItems);
                })
                .catch((error) => reject(error));
        });
    }
}
