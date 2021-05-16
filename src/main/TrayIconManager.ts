import { Menu, Tray, IpcMain } from "electron";
import { join } from "path";
import { IpcChannel } from "../common/IpcChannel";
import { OperatingSystem } from "../common/OperatingSystem/OperatingSystem";
import { TrayIconEvent } from "./TrayIconEvent";

export class TrayIconManager {
    private readonly trayIconFilePath = {
        windows: join(__dirname, "..", "assets", "trayicon", "icon-transparent.ico"),
        macOS: join(__dirname, "..", "assets", "trayicon", "ueliTemplate.png"),
    };

    private trayIcon?: Tray;

    public constructor(private readonly operatingSystem: OperatingSystem, private readonly ipcMain: IpcMain) {
        this.trayIcon = undefined;
    }

    public createTrayIcon(): void {
        this.trayIcon = new Tray(this.getTrayIconPath());
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
                label: "Rescan",
                click: () => this.emitTrayIconEvent(TrayIconEvent.RescanClicked),
            },
            {
                label: "Clear caches",
                click: () => this.emitTrayIconEvent(TrayIconEvent.ClearCachesClicked),
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

    private getTrayIconPath(): string {
        switch (this.operatingSystem) {
            case OperatingSystem.Windows:
                return this.trayIconFilePath.windows;

            case OperatingSystem.macOS:
                return this.trayIconFilePath.macOS;

            default:
                throw new Error(
                    `Failed to create tray icon. Reason: unsupported operating system: ${this.operatingSystem}`
                );
        }
    }
}
