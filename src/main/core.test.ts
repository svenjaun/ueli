import { add } from "./core";

describe(add.name, () => {
    it("should add two numbers", () => {
        const actual = add(1, 2);
        expect(actual).toBe(3);
    });
});
