import { SidebarOption } from "./SidebarOption";

export interface SidebarOptionGroup {
    label: string;
    key: string;
    options: SidebarOption[];
}
