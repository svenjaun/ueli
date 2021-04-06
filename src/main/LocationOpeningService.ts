import { SearchResultItem } from "../common/SearchResultItem";
import { LocationOpener } from "./LocationOpener";

export class LocationOpeningService {
    public constructor(private readonly locationOpeners: LocationOpener[]) {}

    public openLocation(searchResultItem: SearchResultItem): Promise<void> {
        const opener = this.locationOpeners.find(
            (locationOpener) => locationOpener.locationOpenerId === searchResultItem.locationOpenerId
        );

        if (opener) {
            return opener.openLocation(searchResultItem);
        }

        throw new Error("Unable to open location for item. Reason: no file location opener found.");
    }
}
