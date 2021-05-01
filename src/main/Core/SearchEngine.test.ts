import { join } from "path";
import { SearchResultItemDummy } from "../../common/SearchResultItemDummy";
import { DummySearchPlugin } from "../Plugins/DummySearchPlugin/DummySearchPlugin";
import { FileSystemUtility } from "../Utilities/FileSystemUtility";
import { DummySearchable } from "./DummySearchable";
import { Searchable } from "./Searchable";
import { SearchEngine } from "./SearchEngine";

describe(SearchEngine, () => {
    const tempFolderPath = join(__dirname, "temp");

    beforeEach(async () => await FileSystemUtility.createFolderIfDoesntExist(tempFolderPath));
    afterEach(async () => await FileSystemUtility.deleteFolderRecursively(tempFolderPath));

    it("should create plugin temp folders and trigger a rescan on instantiation", async () => {
        const onRescan = jest.fn(() => Promise.resolve());
        const dummySearchPlugin = new DummySearchPlugin(tempFolderPath, undefined, onRescan, undefined);
        new SearchEngine({}, [dummySearchPlugin]);
        const pluginFolderExists = await FileSystemUtility.pathExists(dummySearchPlugin.getTemporaryFolderPath());
        expect(pluginFolderExists).toBe(true);
        expect(onRescan.mock.calls.length).toBe(1);
    });

    describe(SearchEngine.prototype.search, () => {
        const searchables: Searchable[] = [
            new DummySearchable(SearchResultItemDummy.withName("Search Result Item 1")),
            new DummySearchable(SearchResultItemDummy.withName("Search Result Item 2")),
            new DummySearchable(SearchResultItemDummy.withName("Search Result Item 3")),
            new DummySearchable(SearchResultItemDummy.withName("Search Result Item 4")),
        ];

        it("should return an empty array if the search term is an empty string", () => {
            const onGetAllItems = jest.fn(() => searchables);
            const actual = new SearchEngine({}, [new DummySearchPlugin(tempFolderPath, onGetAllItems)]).search("");
            expect(onGetAllItems.mock.calls.length).toBe(0);
            expect(actual.length).toBe(0);
        });

        it("should return all items that match the search term", () => {
            const onGetAllItems = jest.fn(() => searchables);
            const actual = new SearchEngine({}, [new DummySearchPlugin(tempFolderPath, onGetAllItems)]).search(
                "Search Result Item"
            );
            expect(actual).toEqual(searchables.map((searchable) => searchable.toSearchResultItem()));
            expect(onGetAllItems.mock.calls.length).toBe(1);
        });

        it("should be case insensitive", () => {
            const onGetAllItems = jest.fn(() => searchables);
            const actual = new SearchEngine({}, [new DummySearchPlugin(tempFolderPath, onGetAllItems)]).search(
                "search result item"
            );
            expect(actual).toEqual(searchables.map((searchable) => searchable.toSearchResultItem()));
            expect(onGetAllItems.mock.calls.length).toBe(1);
        });

        it("should return an empty array if the search term does not match any of the items", () => {
            const onGetAllItems = jest.fn(() => searchables);
            const actual = new SearchEngine({}, [new DummySearchPlugin(tempFolderPath, onGetAllItems)]).search(
                "whatever"
            );
            expect(actual).toEqual([]);
            expect(onGetAllItems.mock.calls.length).toBe(1);
        });

        it("should support fuzzy search if threshold is high enough", () => {
            const onGetAllItems = jest.fn(() => searchables);
            const actual = new SearchEngine({ threshold: 0.6 }, [
                new DummySearchPlugin(tempFolderPath, onGetAllItems),
            ]).search("srch rslt");
            expect(actual).toEqual(searchables.map((searchable) => searchable.toSearchResultItem()));
            expect(onGetAllItems.mock.calls.length).toBe(1);
        });

        it("should not supporty fuzzy search if threshold is 0", () => {
            const onGetAllItems = jest.fn(() => searchables);
            const actual = new SearchEngine({ threshold: 0 }, [
                new DummySearchPlugin(tempFolderPath, onGetAllItems),
            ]).search("srch rslt");
            expect(actual).toEqual([]);
            expect(onGetAllItems.mock.calls.length).toBe(1);
        });
    });
});
