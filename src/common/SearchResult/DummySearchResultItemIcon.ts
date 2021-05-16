import { SearchResultItemIcon } from "./SearchResultItemIcon";
import { SearchResultItemIconType } from "./SearchResultItemIconType";

export class DummySearchResultItemIcon extends SearchResultItemIcon {
    public constructor(readonly icon: string) {
        super(SearchResultItemIconType.Dummy);
    }
}
