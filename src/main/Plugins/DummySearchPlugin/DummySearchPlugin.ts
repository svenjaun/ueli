import { Searchable } from "../../Core/Searchable";
import { MethodNotImplementedError } from "../../Errors/MethodNotImplementedError";
import { SearchPlugin } from "../SearchPlugin";

export class DummySearchPlugin implements SearchPlugin {
    constructor(
        public onGetAllItems?: () => Searchable[],
        public onRescan?: () => Promise<void>,
        public onClearCache?: () => Promise<void>
    ) {}

    public getAllItems(): Searchable[] {
        if (this.onGetAllItems) {
            return this.onGetAllItems();
        }

        throw new MethodNotImplementedError();
    }

    public rescan(): Promise<void> {
        if (this.onRescan) {
            return this.onRescan();
        }

        throw new MethodNotImplementedError();
    }

    public clearCache(): Promise<void> {
        if (this.onClearCache) {
            return this.onClearCache();
        }

        throw new MethodNotImplementedError();
    }
}
