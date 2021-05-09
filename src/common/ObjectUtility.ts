export class ObjectUtility {
    public static clone<T>(value: T): T {
        return JSON.parse(JSON.stringify(value)) as T;
    }
}
