import { App, globalShortcut, IpcMain } from "electron";
import { IpcMainInvokeEvent } from "electron/main";
import { IpcChannel } from "../common/IpcChannel";
import { OperatingSystem } from "../common/OperatingSystem";
import { SearchResultItem } from "../common/SearchResultItem";
import { ExecutionService } from "./ExecutionService";
import { SearchEngine } from "./SearchEngine";
import { WindowManager } from "./WindowManager";

export class MainApplication {
    constructor(
        private readonly electronApp: App,
        private readonly ipcMain: IpcMain,
        private readonly windowManager: WindowManager,
        private readonly operatingSystem: OperatingSystem,
        private readonly searchEngine: SearchEngine,
        private readonly executionService: ExecutionService
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
        const commandlineSwitches: string[] = [];

        if (this.operatingSystem === OperatingSystem.Windows) {
            commandlineSwitches.push("wm-window-animations-disabled");
        }

        commandlineSwitches.forEach((commandlineSwitch) =>
            this.electronApp.commandLine.appendSwitch(commandlineSwitch)
        );
    }

    private createBrowserWindow(): void {
        this.windowManager.createWindow();
    }

    private hideWindow(): void {
        this.windowManager.hideWindow();
    }

    // private showWindow(): void {
    //     this.windowManager.showWindow();
    // }

    private toggleWindow(): void {
        this.windowManager.toggleWindow();
    }

    private registerGlobalKeyEventListeners(): void {
        globalShortcut.register("alt+space", () => this.toggleWindow());
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
    }
}
