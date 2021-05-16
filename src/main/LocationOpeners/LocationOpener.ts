import { SearchResultItem } from "../../common/SearchResult/SearchResultItem";

export abstract class LocationOpener {
    protected constructor(public readonly locationOpenerId: string) {}
    public abstract openLocation(searchResultItem: SearchResultItem): Promise<void>;
}
