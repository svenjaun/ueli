import { app, ipcMain } from "electron";
import { platform } from "os";
import { OperatingSystemHelper } from "../common/OperatingSystemHelper";
import { MainApplication } from "./MainApplication";
import { WindowManager } from "./WindowManager";

const operatingSystem = OperatingSystemHelper.getOperatingSystem(platform());
new MainApplication(app, ipcMain, new WindowManager(), operatingSystem).start();
