import { App, GlobalShortcut, IpcMain } from "electron";
import { IpcMainInvokeEvent } from "electron/main";
import { IpcChannel } from "../common/IpcChannel";
import { OperatingSystem } from "../common/OperatingSystem";
import { SearchResultItem } from "../common/SearchResultItem";
import { CommandlineSwitchConfiguration } from "./CommandlineSwitchConfiguration";
import { ExecutionService } from "./Core/ExecutionService";
import { LocationOpeningService } from "./Core/LocationOpeningService";
import { SearchEngine } from "./Core/SearchEngine";
import { WindowManager } from "./WindowManager";

export class MainApplication {
    constructor(
        private readonly electronApp: App,
        private readonly ipcMain: IpcMain,
        private readonly globalShortcut: GlobalShortcut,
        private readonly windowManager: WindowManager,
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
        this.electronApp.on("window-all-closed", () => {
            this.electronApp.quit();
        });
    }

    private startApp(): void {
        this.registerIpcEventListeners();
        this.createBrowserWindow();
        this.registerGlobalKeyEventListeners();
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

    private createBrowserWindow(): void {
        this.windowManager.createWindow();
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

                return this.searchEngine.search(args[0]);
            }
        );

        this.ipcMain.handle(
            IpcChannel.Execute,
            (event: IpcMainInvokeEvent, args: SearchResultItem[]): Promise<void> => {
                if (args.length === 0) {
                    return Promise.reject(
                        "Failed to execute search result item. Reason: no search result items given."
                    );
                }

                this.hideWindow();

                return this.executionService.execute(args[0]);
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
    }
}
