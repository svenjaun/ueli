import { SearchResultItem } from "../../common/SearchResultItem";
import { SearchPlugin } from "../Plugins/SearchPlugin";
import { Searchable } from "./Searchable";
import Fuse from "fuse.js";
import { SearchEngineSettings } from "./SearchEngineSettings";

export class SearchEngine {
    private readonly rescanIntervalInSeconds = 60;
    private readonly defaultSearchEngineSettings: Fuse.IFuseOptions<SearchResultItem> = {
        threshold: 0.4,
        keys: ["name"],
    };

    constructor(private searchEngineSettings: SearchEngineSettings, private readonly searchPlugins: SearchPlugin[]) {
        this.rescan();
    }

    public search(searchTerm: string): SearchResultItem[] {
        if (searchTerm.trim().length === 0) {
            return [];
        }

        const allSearchResultItems = this.getAllSearchables().map((searchable) => searchable.toSearchResultItem());

        const settings = Object.assign(this.defaultSearchEngineSettings, this.searchEngineSettings);

        return new Fuse(allSearchResultItems, settings).search(searchTerm).map((s) => s.item);
    }

    public async clearCaches(): Promise<void> {
        try {
            await Promise.all(this.searchPlugins.map((searchPlugin) => searchPlugin.clearCache()));
        } catch (error) {
            throw new Error(`SearchEngine failed to clear caches. Reason: ${error}`);
        }
    }

    private async rescan(): Promise<void> {
        const rescanIntervalInMilliseconds = this.rescanIntervalInSeconds * 1000;

        try {
            await Promise.all(this.searchPlugins.map((searchPlugin) => searchPlugin.rescan()));
        } catch (error) {
            console.error(`Failed to rescan all plugins. Reason: ${error}`);
        } finally {
            setTimeout(() => this.rescan(), rescanIntervalInMilliseconds);
        }
    }

    private getAllSearchables(): Searchable[] {
        let result: Searchable[] = [];

        this.searchPlugins.forEach((searchPlugin) => {
            result = result.concat(searchPlugin.getAllItems());
        });

        return result;
    }
}
