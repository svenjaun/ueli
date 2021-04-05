import { BrowserWindow } from "electron";
import { join } from "path";

export class WindowManager {
    private readonly mainHtmlFilePath = join(
        __dirname,
        "..",
        "views",
        "main.html"
    );

    private readonly preloadFilePath = join(__dirname, "preload.js");

    private browserWindow?: BrowserWindow;

    public createWindow(): void {
        this.browserWindow = new BrowserWindow({
            webPreferences: {
                preload: this.preloadFilePath,
            },
        });

        this.browserWindow.loadFile(this.mainHtmlFilePath);
    }
}
