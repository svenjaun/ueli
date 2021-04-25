import { BrowserWindow } from "electron";
import { join } from "path";
import { IpcChannel } from "../common/IpcChannel";

export class WindowManager {
    private readonly mainHtmlFilePath = join(__dirname, "..", "views", "main.html");
    private readonly preloadFilePath = join(__dirname, "Preload.js");
    private mainWindow?: BrowserWindow;

    public createMainWindow(): void {
        this.mainWindow = new BrowserWindow({
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

        this.mainWindow.loadFile(this.mainHtmlFilePath);
        this.mainWindow.on("blur", () => this.hideMainWindow());
    }

    public hideMainWindow(): void {
        if (this.mainWindow && !this.mainWindow.isDestroyed()) {
            this.mainWindow.hide();
        }
    }

    public showMainWindow(): void {
        if (this.mainWindow && !this.mainWindow.isDestroyed()) {
            if (this.mainWindow.isVisible()) {
                this.mainWindow.focus();
            } else {
                this.mainWindow.show();
            }

            this.sendMessageToWindow(this.mainWindow, IpcChannel.MainWindowShown);
        }
    }

    public toggleMainWindow(): void {
        if (this.mainWindow && !this.mainWindow.isDestroyed()) {
            this.mainWindow.isVisible() ? this.hideMainWindow() : this.showMainWindow();
        }
    }

    private sendMessageToWindow<ArgumentType>(
        browserWindow: BrowserWindow,
        channel: IpcChannel,
        ...args: ArgumentType[]
    ): void {
        if (this.mainWindow && !this.mainWindow.isDestroyed()) {
            browserWindow.webContents.send(channel, args);
        }
    }
}
