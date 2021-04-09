import { Searchable } from "../Core/Searchable";

export interface SearchPlugin {
    getAllItems(): Promise<Searchable[]>;
}
