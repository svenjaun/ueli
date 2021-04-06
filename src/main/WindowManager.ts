import { BrowserWindow } from "electron";
import { join } from "path";
import { IpcChannel } from "../common/IpcChannel";

export class WindowManager {
    private readonly mainHtmlFilePath = join(__dirname, "..", "views", "main.html");
    private readonly preloadFilePath = join(__dirname, "Preload.js");
    private browserWindow?: BrowserWindow;

    public createWindow(): void {
        this.browserWindow = new BrowserWindow({
            frame: false,
            fullscreen: false,
            height: 500,
            show: false,
            transparent: true,
            webPreferences: {
                preload: this.preloadFilePath,
                spellcheck: false,
            },
            width: 600,
        });

        this.browserWindow.loadFile(this.mainHtmlFilePath);
        this.browserWindow.on("blur", () => this.hideMainWindow());
    }

    public hideMainWindow(): void {
        if (this.browserWindow && !this.browserWindow.isDestroyed()) {
            this.browserWindow.hide();
        }
    }

    public showMainWindow(): void {
        if (this.browserWindow && !this.browserWindow.isDestroyed()) {
            if (this.browserWindow.isVisible()) {
                this.browserWindow.focus();
            } else {
                this.browserWindow.show();
            }

            this.sendMessageToWindow(this.browserWindow, IpcChannel.MainWindowShown);
        }
    }

    public toggleMainWindow(): void {
        if (this.browserWindow && !this.browserWindow.isDestroyed()) {
            this.browserWindow.isVisible() ? this.hideMainWindow() : this.showMainWindow();
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private sendMessageToWindow(browserWindow: BrowserWindow, channel: IpcChannel, ...args: any): void {
        if (this.browserWindow && !this.browserWindow.isDestroyed()) {
            browserWindow.webContents.send(channel, args);
        }
    }
}