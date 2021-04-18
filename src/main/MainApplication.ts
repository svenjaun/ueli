import { App, GlobalShortcut, IpcMain } from "electron";
import { IpcMainInvokeEvent } from "electron/main";
import { IpcChannel } from "../common/IpcChannel";
import { OperatingSystem } from "../common/OperatingSystem";
import { SearchResultItem } from "../common/SearchResultItem";
import { CommandlineSwitchConfiguration } from "./CommandlineSwitchConfiguration";
import { ExecutionService } from "./Core/ExecutionService";
import { LocationOpeningService } from "./Core/LocationOpeningService";
import { SearchEngine } from "./Core/SearchEngine";
import { TrayIconEvent } from "./TrayIconEvent";
import { TrayIconManager } from "./TrayIconManager";
import { WindowManager } from "./WindowManager";

export class MainApplication {
    constructor(
        private readonly electronApp: App,
        private readonly ipcMain: IpcMain,
        private readonly globalShortcut: GlobalShortcut,
        private readonly windowManager: WindowManager,
        private readonly trayIconManager: TrayIconManager,
        private readonly operatingSystem: OperatingSystem,
        private readonly searchEngine: SearchEngine,
        private readonly executionService: ExecutionService,
        private readonly locationOpeningService: LocationOpeningService
    ) {}

    public start(): void {
        this.registerElectronAppEventListeners();
    }

    private registerElectronAppEventListeners(): void {
        this.appendCommandlineSwitches();
        this.electronApp.on("ready", () => this.startApp());
        this.electronApp.on("window-all-closed", () => this.quitApp());
    }

    private startApp(): void {
        this.registerIpcEventListeners();
        this.createTrayIcon();
        this.createBrowserWindow();
        this.registerGlobalKeyEventListeners();
    }

    private quitApp(): void {
        this.electronApp.quit();
    }

    private appendCommandlineSwitches(): void {
        const commandlineSwitchConfigurations: CommandlineSwitchConfiguration[] = [
            {
                operatingSystem: OperatingSystem.Windows,
                commandlineSwitches: ["wm-window-animations-disabled"],
            },
        ];

        commandlineSwitchConfigurations.forEach((commandlineSwitchConfiguration) => {
            if (
                commandlineSwitchConfiguration.operatingSystem === this.operatingSystem ||
                commandlineSwitchConfiguration.operatingSystem === undefined
            ) {
                commandlineSwitchConfiguration.commandlineSwitches.forEach((commandlineSwitch) => {
                    this.electronApp.commandLine.appendSwitch(commandlineSwitch);
                });
            }
        });
    }

    private createTrayIcon(): void {
        this.trayIconManager.createTrayIcon();
    }

    private createBrowserWindow(): void {
        this.windowManager.createMainWindow();
    }

    private showWindow(): void {
        this.windowManager.showMainWindow();
    }

    private hideWindow(): void {
        this.windowManager.hideMainWindow();
    }

    private registerGlobalKeyEventListeners(): void {
        this.globalShortcut.register("Alt+Space", () => this.windowManager.toggleMainWindow());
    }

    private registerIpcEventListeners(): void {
        this.ipcMain.handle(
            IpcChannel.Search,
            (event: IpcMainInvokeEvent, args: string[]): Promise<SearchResultItem[]> => {
                if (args.length === 0) {
                    return Promise.reject("Failed to handle search term. Reason: no search term specified.");
                }

                return Promise.resolve(this.searchEngine.search(args[0]));
            }
        );

        this.ipcMain.handle(
            IpcChannel.Execute,
            async (event: IpcMainInvokeEvent, args: SearchResultItem[]): Promise<void> => {
                if (args.length === 0) {
                    return Promise.reject(
                        "Failed to execute search result item. Reason: no search result items given."
                    );
                }

                this.hideWindow();

                await this.executionService.execute(args[0]);
            }
        );

        this.ipcMain.handle(
            IpcChannel.OpenLocation,
            (event: IpcMainInvokeEvent, args: SearchResultItem[]): Promise<void> => {
                if (args.length === 0) {
                    return Promise.reject("Unable to open location. Reason: no search result items given.");
                }

                this.hideWindow();

                return this.locationOpeningService.openLocation(args[0]);
            }
        );

        this.ipcMain.on(IpcChannel.EscapePressed, () => this.hideWindow());

        this.ipcMain.on(IpcChannel.TrayIconEvent, (ipcMainEvent, trayIconEvent: TrayIconEvent) =>
            this.handleTrayIconEvent(trayIconEvent)
        );
    }

    private handleTrayIconEvent(event: TrayIconEvent): void {
        switch (event) {
            case TrayIconEvent.ShowClicked:
                return this.showWindow();

            case TrayIconEvent.QuitClicked:
                return this.quitApp();

            default:
                throw new Error(`Failed to handle tray icon event ${event}. Reason: no handler found.`);
        }
    }
}
