import { app, globalShortcut, ipcMain, shell } from "electron";
import { platform } from "os";
import { OperatingSystemHelper } from "../common/OperatingSystemHelper";
import { ExecutionService } from "./Core/ExecutionService";
import { FilePathExecutor } from "./Executors/FilePathExecutor";
import { FilePathLocationOpener } from "./LocationOpeners/FilePathLocationOpener";
import { MainApplication } from "./MainApplication";
import { LocationOpeningService } from "./Core/LocationOpeningService";
import { SearchEngine } from "./Core/SearchEngine";
import { WindowManager } from "./WindowManager";
import { PowershellUtility } from "./Utilities/PowershellUtility";
import { WindowsApplicationSearchPreferences } from "./Plugins/WindowsApplicationSearchPlugin/WindowsApplicationSearchPreferences";
import { WindowsApplicationSearchPlugin } from "./Plugins/WindowsApplicationSearchPlugin/WindowsApplicationSearchPlugin";
import { TrayIconManager } from "./TrayIconManager";
import { ApplicationRuntimeInformation } from "./ApplicationRuntimeInformation";
import { SimpleFolderSearchPlugin } from "./Plugins/SimpleFolderSearchPlugin/SimpleFolderSearchPlugin";

const operatingSystem = OperatingSystemHelper.getOperatingSystem(platform());

const applicationRuntimeInformation: ApplicationRuntimeInformation = {
    executablePath: app.getPath("exe"),
    temporaryDirectoryPath: app.getPath("temp"),
    userDataPath: app.getPath("userData"),
    userHomePath: app.getPath("home"),
};

const windowManager = new WindowManager();
const trayIconManager = new TrayIconManager(ipcMain);

const applicationSearchPreferences: WindowsApplicationSearchPreferences = {
    folderPaths: [
        "C:\\ProgramData\\Microsoft\\Windows\\Start Menu",
        "C:\\Users\\Oliver\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu",
    ],
    fileExtensions: ["lnk"],
};

const executePowershellScript = (powershellScript: string): Promise<string> =>
    PowershellUtility.executePowershellScript(powershellScript);

const searchEngine = new SearchEngine({}, [
    new WindowsApplicationSearchPlugin(
        applicationRuntimeInformation,
        executePowershellScript,
        applicationSearchPreferences
    ),
    new SimpleFolderSearchPlugin(applicationRuntimeInformation),
]);

const openFilePath = async (filePath: string): Promise<void> => {
    const errorMessage = await shell.openPath(filePath);

    if (errorMessage) {
        throw new Error(errorMessage);
    }
};

const openFileLocation = async (filePath: string): Promise<void> => {
    shell.showItemInFolder(filePath);
};

const executionService = new ExecutionService([new FilePathExecutor(openFilePath)]);
const locationOpeningService = new LocationOpeningService([new FilePathLocationOpener(openFileLocation)]);

new MainApplication(
    app,
    ipcMain,
    globalShortcut,
    windowManager,
    trayIconManager,
    operatingSystem,
    searchEngine,
    executionService,
    locationOpeningService
).start();
