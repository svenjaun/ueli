import { SearchResultItemDummy } from "../../common/SearchResult/SearchResultItemDummy";
import { LocationOpenerDummy } from "../LocationOpeners/LocationOpenerDummy";
import { LocationOpeningService } from "./LocationOpeningService";

describe(LocationOpeningService, () => {
    describe(LocationOpeningService.prototype.openLocation, () => {
        it("should succeed if there is an corresponding location opener", (done) => {
            const locationOpenerDummy = new LocationOpenerDummy();
            new LocationOpeningService([locationOpenerDummy])
                .openLocation(SearchResultItemDummy.withLocationOpenerId(locationOpenerDummy.locationOpenerId))
                .then(() => done())
                .catch((error) => done(error));
        });

        it("should fail if the corresponding location opener fails", (done) => {
            const locationOpenerDummy = new LocationOpenerDummy("LocationOpenerDummy", false);
            new LocationOpeningService([locationOpenerDummy])
                .openLocation(SearchResultItemDummy.withLocationOpenerId(locationOpenerDummy.locationOpenerId))
                .then(() => done("Should have failed"))
                .catch((error) => {
                    expect(error).toBe("Failed");
                    done();
                });
        });

        it("should fail if there is no corresponding location opener", (done) => {
            new LocationOpeningService([new LocationOpenerDummy()])
                .openLocation(SearchResultItemDummy.withLocationOpenerId("Some other opener id"))
                .then(() => done("Should have failed"))
                .catch((error) => {
                    expect(error).toBe(
                        `Unable to open location for "Some other opener id". Reason: no location opener found.`
                    );
                    done();
                });
        });
    });
});
