import { app, globalShortcut, ipcMain, shell } from "electron";
import { platform } from "os";
import { OperatingSystemHelper } from "../common/OperatingSystemHelper";
import { ExecutionService } from "./ExecutionService";
import { FilePathExecutor } from "./FilePathExecutor";
import { FilePathLocationOpener } from "./FilePathLocationOpener";
import { MainApplication } from "./MainApplication";
import { LocationOpeningService } from "./LocationOpeningService";
import { SearchEngine } from "./SearchEngine";
import { WindowManager } from "./WindowManager";
import { PowershellUtility } from "./Utilities/PowershellUtility";
import { ApplicationSearchPreferences } from "./Plugins/WindowsApplicationSearchPlugin/ApplicationSearchPreferences";
import { WindowsApplicationSearchPlugin } from "./Plugins/WindowsApplicationSearchPlugin/WindowsApplicationSearchPlugin";

const operatingSystem = OperatingSystemHelper.getOperatingSystem(platform());
const windowManager = new WindowManager();

const applicationSearchPreferences: ApplicationSearchPreferences = {
    folderPaths: [
        "C:\\ProgramData\\Microsoft\\Windows\\Start Menu",
        "C:\\Users\\Oliver\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu",
    ],
    fileExtensions: ["lnk"],
};

const executePowershellScript = (powershellScript: string): Promise<string> =>
    PowershellUtility.executePowershellScript(powershellScript);

const searchEngine = new SearchEngine([
    new WindowsApplicationSearchPlugin(executePowershellScript, applicationSearchPreferences),
]);

const openFilePath = (filePath: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        shell
            .openPath(filePath)
            .then((result) => (result.length === 0 ? resolve() : reject(result)))
            .catch((error) => reject(error));
    });
};

const openFileLocation = (filePath: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            shell.showItemInFolder(filePath);
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

const executionService = new ExecutionService([new FilePathExecutor(openFilePath)]);
const locationOpeningService = new LocationOpeningService([new FilePathLocationOpener(openFileLocation)]);

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
