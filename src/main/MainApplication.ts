import { App, IpcMain } from "electron";
import { IpcChannel } from "../common/IpcChannel";
import { OperatingSystem } from "../common/OperatingSystem";
import { WindowManager } from "./WindowManager";

export class MainApplication {
    constructor(
        private readonly electronApp: App,
        private readonly ipcMain: IpcMain,
        private readonly winodwManager: WindowManager,
        private readonly operatingSystem: OperatingSystem
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
        this.winodwManager.createWindow();
    }

    private registerIpcEventListeners(): void {
        this.ipcMain.on(IpcChannel.rendererReady, () => {
            // tslint:disable-next-line: no-console
            console.log("renderer is ready");
        });
    }
}
