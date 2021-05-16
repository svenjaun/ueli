import { OperatingSystem } from "./OperatingSystem";
import { OperatingSystemHelper } from "./OperatingSystemHelper";

describe(OperatingSystemHelper, () => {
    it("should return Windows on win32 platform", () => {
        expect(OperatingSystemHelper.getOperatingSystem("win32")).toBe(OperatingSystem.Windows);
    });

    it("should return macOS on darwin platform", () => {
        expect(OperatingSystemHelper.getOperatingSystem("darwin")).toBe(OperatingSystem.macOS);
    });

    it("should return Linux on linux platform", () => {
        expect(OperatingSystemHelper.getOperatingSystem("linux")).toBe(OperatingSystem.Linux);
    });

    it("should throw an error on an unexpected platform", () => {
        const unexpectedPlatforms = [
            "",
            "WINDOWS",
            "windows",
            "mac",
            "macos",
            "macosx",
            "osx",
            "MAC",
            "MACOS",
            "OSX",
            "LINUX",
            "ubuntu",
            "whatever",
        ];

        let errorCounter = 0;

        unexpectedPlatforms.forEach((unexpectedPlatform) => {
            try {
                OperatingSystemHelper.getOperatingSystem(unexpectedPlatform);
            } catch (error) {
                errorCounter++;
            }
        });

        expect(errorCounter).toBe(unexpectedPlatforms.length);
    });
});
