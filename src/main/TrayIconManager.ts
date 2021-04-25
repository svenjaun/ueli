import { Menu, Tray, IpcMain } from "electron";
import { join } from "path";
import { IpcChannel } from "../common/IpcChannel";
import { TrayIconEvent } from "./TrayIconEvent";

export class TrayIconManager {
    private readonly trayIconPath = join(__dirname, "..", "assets", "trayicon", "icon-transparent.ico");
    private trayIcon?: Tray;

    public constructor(private readonly ipcMain: IpcMain) {
        this.trayIcon = undefined;
    }

    public createTrayIcon(): void {
        this.trayIcon = new Tray(this.trayIconPath);
        this.trayIcon.setToolTip("ueli");
        this.trayIcon.setContextMenu(this.getContextMenu());
    }

    private getContextMenu(): Menu {
        return Menu.buildFromTemplate([
            {
                label: "Show",
                click: () => this.emitTrayIconEvent(TrayIconEvent.ShowClicked),
            },
            {
                label: "Settings",
                click: () => this.emitTrayIconEvent(TrayIconEvent.SettingsClicked),
            },
            {
                label: "Quit",
                click: () => this.emitTrayIconEvent(TrayIconEvent.QuitClicked),
            },
        ]);
    }

    private emitTrayIconEvent(event: TrayIconEvent): void {
        this.ipcMain.emit(IpcChannel.TrayIconEvent, undefined, event);
    }
}
