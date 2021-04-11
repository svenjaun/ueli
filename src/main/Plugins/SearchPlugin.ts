import { Searchable } from "../Core/Searchable";

export interface SearchPlugin {
    getAllItems(): Searchable[];
    rescan(): Promise<void>;
    clearCache(): Promise<void>;
}
