import { Searchable } from "../../Core/Searchable";
import { DummyApplicationRuntimeInformation } from "../../DummyApplicationRuntimeInformation";
import { MethodNotImplementedError } from "../../Errors/MethodNotImplementedError";
import { SearchPlugin } from "../SearchPlugin";

export class DummySearchPlugin extends SearchPlugin {
    public readonly pluginId = "DummySearchPlugin";

    constructor(
        applicationTempPath: string,
        public onGetAllSearchables?: () => Searchable[],
        public onRescan?: () => Promise<void>,
        public onClearCache?: () => Promise<void>
    ) {
        super(DummyApplicationRuntimeInformation.empty({ userDataPath: applicationTempPath }));
    }

    public getAllSearchables(): Searchable[] {
        if (this.onGetAllSearchables) {
            return this.onGetAllSearchables();
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
