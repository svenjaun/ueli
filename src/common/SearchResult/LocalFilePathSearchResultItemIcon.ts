import { SearchResultItemIcon } from "./SearchResultItemIcon";
import { SearchResultItemIconType } from "./SearchResultItemIconType";

export class LocalFilePathSearchResultItemIcon extends SearchResultItemIcon {
    public constructor(readonly filePath: string) {
        super(SearchResultItemIconType.FilePath);
    }
}
