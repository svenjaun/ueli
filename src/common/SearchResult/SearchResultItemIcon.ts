import { SearchResultItemIconType } from "./SearchResultItemIconType";

export abstract class SearchResultItemIcon {
    public constructor(public readonly type: SearchResultItemIconType) {}
}
