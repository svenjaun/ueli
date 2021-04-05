import { app, globalShortcut, ipcMain } from "electron";
import { platform } from "os";
import { OperatingSystemHelper } from "../common/OperatingSystemHelper";
import { ExecutionService } from "./ExecutionService";
import { FilePathExecutor } from "./FilePathExecutor";
import { FilePathLocationOpener } from "./FilePathLocationOpener";
import { MainApplication } from "./MainApplication";
import { OpenLocationService } from "./OpenLocationService";
import { SearchEngine } from "./SearchEngine";
import { searchResultItems } from "./SearchResultItems";
import { WindowManager } from "./WindowManager";

const operatingSystem = OperatingSystemHelper.getOperatingSystem(platform());
const windowManager = new WindowManager();
const searchEngine = new SearchEngine(searchResultItems);
const executionService = new ExecutionService([new FilePathExecutor()]);
const openLocationService = new OpenLocationService([new FilePathLocationOpener()]);

new MainApplication(
    app,
    ipcMain,
    globalShortcut,
    windowManager,
    operatingSystem,
    searchEngine,
    executionService,
    openLocationService
).start();
