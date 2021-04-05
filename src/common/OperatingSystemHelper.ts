import { OperatingSystem } from "./OperatingSystem";

export class OperatingSystemHelper {
    public static getOperatingSystem(platform: string): OperatingSystem {
        switch (platform) {
            case "win32":
                return OperatingSystem.Windows;

            case "darwin":
                return OperatingSystem.macOS;

            case "linux":
                return OperatingSystem.Linux;

            default:
                throw new Error(`Unsupported platform: ${platform}`);
        }
    }
}
