import { LocationOpener } from "./LocationOpener";

export class LocationOpenerDummy extends LocationOpener {
    constructor(locationOpenerId = "LocationOpenerDummy", public openLocationWillSucceed = true) {
        super(locationOpenerId);
    }

    public openLocation(): Promise<void> {
        return this.openLocationWillSucceed ? Promise.resolve() : Promise.reject("Failed");
    }
}
