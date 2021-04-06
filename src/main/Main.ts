import { app, globalShortcut, ipcMain, shell } from "electron";
import { platform } from "os";
import { OperatingSystemHelper } from "../common/OperatingSystemHelper";
import { ExecutionService } from "./ExecutionService";
import { FilePathExecutor } from "./FilePathExecutor";
import { FilePathLocationOpener } from "./FilePathLocationOpener";
import { MainApplication } from "./MainApplication";
import { LocationOpeningService } from "./LocationOpeningService";
import { SearchEngine } from "./SearchEngine";
import { searchResultItems } from "./SearchResultItems";
import { WindowManager } from "./WindowManager";

const operatingSystem = OperatingSystemHelper.getOperatingSystem(platform());
const windowManager = new WindowManager();
const searchEngine = new SearchEngine(searchResultItems);

const executionService = new ExecutionService([
    new FilePathExecutor((filePath: string) => {
        return new Promise((resolve, reject) => {
            shell
                .openPath(filePath)
                .then((result) => (result.length === 0 ? resolve() : reject(result)))
                .catch((error) => reject(error));
        });
    }),
]);

const locationOpeningService = new LocationOpeningService([
    new FilePathLocationOpener((filePath: string) => {
        return new Promise((resolve, reject) => {
            try {
                shell.showItemInFolder(filePath);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }),
]);

new MainApplication(
    app,
    ipcMain,
    globalShortcut,
    windowManager,
    operatingSystem,
    searchEngine,
    executionService,
    locationOpeningService
).start();
