import { SearchResultItem } from "../common/SearchResultItem";
import { WindowsApplicationsRetriever } from "./WindowsApplicationsRetriever";

export class SearchEngine {
    private searchResultItems: SearchResultItem[];

    constructor(private readonly windowsApplicationRetriever: WindowsApplicationsRetriever) {
        this.searchResultItems = [];
        this.updateSearchResultItems();
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

    private updateSearchResultItems(): void {
        this.windowsApplicationRetriever
            .getApps()
            .then((apps) => (this.searchResultItems = apps.map((app) => app.toSearchResultItem())))
            .catch((error) => console.log(error));
    }
}
