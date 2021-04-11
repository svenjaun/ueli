import { SearchResultItemDummy } from "../../common/SearchResultItemDummy";
import { DummySearchPlugin } from "../Plugins/DummySearchPlugin/DummySearchPlugin";
import { DummySearchable } from "./DummySearchable";
import { Searchable } from "./Searchable";
import { SearchEngine } from "./SearchEngine";

describe(SearchEngine, () => {
    it("should trigger a rescan on instantiation", () => {
        const onRescan = jest.fn(() => Promise.resolve());
        new SearchEngine({}, [new DummySearchPlugin(undefined, onRescan, undefined)]);
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
            const actual = new SearchEngine({}, [new DummySearchPlugin(onGetAllItems)]).search("");
            expect(onGetAllItems.mock.calls.length).toBe(0);
            expect(actual.length).toBe(0);
        });

        it("should return all items that match the search term", () => {
            const onGetAllItems = jest.fn(() => searchables);
            const actual = new SearchEngine({}, [new DummySearchPlugin(onGetAllItems)]).search("Search Result Item");
            expect(actual).toEqual(searchables.map((searchable) => searchable.toSearchResultItem()));
            expect(onGetAllItems.mock.calls.length).toBe(1);
        });

        it("should be case insensitive", () => {
            const onGetAllItems = jest.fn(() => searchables);
            const actual = new SearchEngine({}, [new DummySearchPlugin(onGetAllItems)]).search("search result item");
            expect(actual).toEqual(searchables.map((searchable) => searchable.toSearchResultItem()));
            expect(onGetAllItems.mock.calls.length).toBe(1);
        });

        it("should return an empty array if the search term does not match any of the items", () => {
            const onGetAllItems = jest.fn(() => searchables);
            const actual = new SearchEngine({}, [new DummySearchPlugin(onGetAllItems)]).search("whatever");
            expect(actual).toEqual([]);
            expect(onGetAllItems.mock.calls.length).toBe(1);
        });

        it("should support fuzzy search if threshold is high enough", () => {
            const onGetAllItems = jest.fn(() => searchables);
            const actual = new SearchEngine({ threshold: 0.6 }, [new DummySearchPlugin(onGetAllItems)]).search(
                "srch rslt"
            );
            expect(actual).toEqual(searchables.map((searchable) => searchable.toSearchResultItem()));
            expect(onGetAllItems.mock.calls.length).toBe(1);
        });

        it("should not supporty fuzzy search if threshold is 0", () => {
            const onGetAllItems = jest.fn(() => searchables);
            const actual = new SearchEngine({ threshold: 0 }, [new DummySearchPlugin(onGetAllItems)]).search(
                "srch rslt"
            );
            expect(actual).toEqual([]);
            expect(onGetAllItems.mock.calls.length).toBe(1);
        });
    });
});
