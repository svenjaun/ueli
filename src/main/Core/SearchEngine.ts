import { SearchResultItem } from "../../common/SearchResultItem";
import { SearchPlugin } from "../Plugins/SearchPlugin";

export class SearchEngine {
    private searchResultItems: SearchResultItem[];
    private readonly rescanIntervalInSeconds = 60;

    constructor(private readonly searchPlugins: SearchPlugin[]) {
        this.searchResultItems = [];
        this.rescan();
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

    private rescan(): void {
        this.getSearchResultItems()
            .then((searchResultItems) => (this.searchResultItems = searchResultItems))
            .catch((error) => console.error(`Search engine rescan failed. Reason: ${error}`))
            .finally(() => setTimeout(() => this.rescan(), this.rescanIntervalInSeconds * 1000));
    }

    private getSearchResultItems(): Promise<SearchResultItem[]> {
        return new Promise((resolve, reject) => {
            Promise.all(this.searchPlugins.map((searchPlugin) => searchPlugin.getAllItems()))
                .then((searchablesList) => {
                    let searchResultItems: SearchResultItem[] = [];

                    searchablesList.forEach((searchables) => {
                        searchResultItems = searchResultItems.concat(
                            searchables.map((searchable) => searchable.toSearchResultItem())
                        );
                    });

                    resolve(searchResultItems);
                })
                .catch((error) => reject(error));
        });
    }
}
