import { app, ipcMain } from "electron";
import { platform } from "os";
import { OperatingSystemHelper } from "../common/OperatingSystemHelper";
import { ExecutionService } from "./ExecutionService";
import { FilePathExecutor } from "./FilePathExecutor";
import { MainApplication } from "./MainApplication";
import { SearchEngine } from "./SearchEngine";
import { searchResultItems } from "./SearchResultItems";
import { WindowManager } from "./WindowManager";

const operatingSystem = OperatingSystemHelper.getOperatingSystem(platform());
const windowManager = new WindowManager();
const searchEngine = new SearchEngine(searchResultItems);
const executionService = new ExecutionService([new FilePathExecutor()]);

new MainApplication(app, ipcMain, windowManager, operatingSystem, searchEngine, executionService).start();
