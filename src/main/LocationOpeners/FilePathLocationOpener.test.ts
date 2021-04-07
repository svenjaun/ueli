import { FilePathLocationOpener } from "./FilePathLocationOpener";
import { SearchResultItemDummy } from "../../common/SearchResultItemDummy";

describe(FilePathLocationOpener, () => {
    it("should succeed if the file path location opener resolves", (done) => {
        new FilePathLocationOpener(() => Promise.resolve())
            .openLocation(SearchResultItemDummy.empty())
            .then(() => done())
            .catch((error) => done(error));
    });

    it("should fail if the file path location opener rejects", (done) => {
        new FilePathLocationOpener(() => Promise.reject("Failed"))
            .openLocation(SearchResultItemDummy.empty())
            .then(() => done("It should have failed"))
            .catch(() => done());
    });
});
