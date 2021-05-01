import { emptyDir, rmdir, ensureDir, pathExists } from "fs-extra";

export class FileSystemUtility {
    public static createFolderIfDoesntExist(folderPath: string): Promise<void> {
        return ensureDir(folderPath);
    }

    public static async deleteFolderRecursively(folderPath: string): Promise<void> {
        await this.cleanFolder(folderPath);
        return rmdir(folderPath);
    }

    public static cleanFolder(folderPath: string): Promise<void> {
        return emptyDir(folderPath);
    }

    public static pathExists(fileOrFolderPath: string): Promise<boolean> {
        return pathExists(fileOrFolderPath);
    }
}
