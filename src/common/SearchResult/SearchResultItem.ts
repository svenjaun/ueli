import { SearchResultItemIcon } from "./SearchResultItemIcon";

export interface SearchResultItem {
    name: string;
    description: string;
    executionArgument: string;
    openLocationArgument: string;
    locationOpenerId: string;
    executorId: string;
    icon: SearchResultItemIcon;
}
