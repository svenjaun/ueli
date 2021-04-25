export class SearchEngineRescanError extends Error {
    public constructor(reason: string) {
        super(`Failed to rescan all plugins. Reason: ${reason}`);
    }
}
