import { SearchResultItemIcon } from "./SearchResultItemIcon";
import { SearchResultItemIconType } from "./SearchResultItemIconType";

export class SvgSearchResultItemIcon extends SearchResultItemIcon {
    public constructor(public readonly svg: string) {
        super(SearchResultItemIconType.Svg);
    }
}
