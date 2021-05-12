import Fuse from "fuse.js";
import { SearchResultItem } from "../../common/SearchResultItem";
import { SearchPlugin } from "../Plugins/SearchPlugin";
import { Searchable } from "./Searchable";
import { SearchEngineSettings } from "./SearchEngineSettings";
import { SearchEngineRescanError } from "./SearchEngineRescanError";
import { FileSystemUtility } from "../Utilities/FileSystemUtility";

export class SearchEngine {
    private readonly rescanIntervalInSeconds = 60;
    private readonly defaultSearchEngineSettings: Fuse.IFuseOptions<SearchResultItem> = {
        threshold: 0.4,
        keys: ["name"],
    };

    constructor(private searchEngineSettings: SearchEngineSettings, private readonly searchPlugins: SearchPlugin[]) {
        this.initialize();
    }

    public search(searchTerm: string): SearchResultItem[] {
        if (searchTerm.trim().length === 0) {
            return [];
        }

        return new Fuse(
            this.getAllSearchables().map((searchable) => searchable.toSearchResultItem()),
            Object.assign(this.defaultSearchEngineSettings, this.searchEngineSettings)
        )
            .search(searchTerm)
            .map((fuseSearchResult) => fuseSearchResult.item);
    }

    public async clearCaches(): Promise<void> {
        try {
            await Promise.all(this.searchPlugins.map((searchPlugin) => searchPlugin.clearCache()));
        } catch (error) {
            throw new Error(`SearchEngine failed to clear caches. Reason: ${error}`);
        }
    }

    private async initialize(): Promise<void> {
        await this.createPluginTempFolders();
        this.rescan();
    }

    private async createPluginTempFolders(): Promise<void> {
        await Promise.all(
            this.searchPlugins.map((searchPlugin) => {
                FileSystemUtility.createFolderIfDoesntExist(searchPlugin.getTemporaryFolderPath());
            })
        );
    }

    private async rescan(): Promise<void> {
        const rescanIntervalInMilliseconds = this.rescanIntervalInSeconds * 1000;
        const scheduleNextRescan = () => setTimeout(() => this.rescan(), rescanIntervalInMilliseconds);

        try {
            await Promise.all(this.searchPlugins.map((searchPlugin) => searchPlugin.rescan()));
        } catch (error) {
            this.handleError(new SearchEngineRescanError(error));
        } finally {
            scheduleNextRescan();
        }
    }

    private getAllSearchables(): Searchable[] {
        let result: Searchable[] = [];

        this.searchPlugins.forEach((searchPlugin) => {
            result = result.concat(searchPlugin.getAllItems());
        });

        return result;
    }

    private handleError(error: Error): void {
        console.error(`Handled error: ${error.message}`);
    }
}
