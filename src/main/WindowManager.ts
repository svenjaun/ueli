import { BrowserWindow } from "electron";
import { join } from "path";

export class WindowManager {
    private readonly mainHtmlFilePath = join(
        __dirname,
        "..",
        "views",
        "main.html"
    );

    private readonly preloadFilePath = join(__dirname, "Preload.js");

    private browserWindow?: BrowserWindow;

    public createWindow(): void {
        this.browserWindow = new BrowserWindow({
            height: 500,
            width: 600,
            fullscreen: false,
            frame: false,
            transparent: true,
            webPreferences: {
                preload: this.preloadFilePath,
                spellcheck: false,
            },
        });

        this.browserWindow.loadFile(this.mainHtmlFilePath);
    }
}
