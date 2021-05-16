import { SearchResultItem } from "../../common/SearchResult/SearchResultItem";
import { LocationOpener } from "../LocationOpeners/LocationOpener";

export class LocationOpeningService {
    public constructor(private readonly locationOpeners: LocationOpener[]) {}

    public openLocation(searchResultItem: SearchResultItem): Promise<void> {
        const opener = this.locationOpeners.find(
            (locationOpener) => locationOpener.locationOpenerId === searchResultItem.locationOpenerId
        );

        return opener
            ? opener.openLocation(searchResultItem)
            : Promise.reject(
                  `Unable to open location for "${searchResultItem.locationOpenerId}". Reason: no location opener found.`
              );
    }
}
