import { SearchResultItemIcon } from "./SearchResultItemIcon";
import { SearchResultItemIconType } from "./SearchResultItemIconType";

export class DataUrlSearchResultItemIcon extends SearchResultItemIcon {
    public constructor(readonly dataUrl: string) {
        super(SearchResultItemIconType.DataUrl);
    }
}
