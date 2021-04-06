import { SearchResultItem } from "../common/SearchResultItem";
import { FilePathExecutor } from "./FilePathExecutor";

describe(FilePathExecutor, () => {
    const searchResultItem: SearchResultItem = {
        description: "",
        executionArgument: "",
        executorId: "",
        icon: "",
        locationOpenerId: "",
        name: "",
        openLocationArgument: "",
    };

    it("should do things", () => {
        const filePathOpener = jest.fn(() => Promise.resolve());
        const filePathExecutor = new FilePathExecutor(filePathOpener);

        filePathExecutor.execute(searchResultItem);

        expect(filePathOpener.mock.calls.length).toBe(1);
    });
});
