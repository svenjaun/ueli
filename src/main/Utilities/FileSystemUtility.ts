import { emptyDir, rmdir, ensureDir, pathExists, readdir } from "fs-extra";
import { join } from "path";

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

    public static getFolderItems(folderPath: string): Promise<string[]> {
        return new Promise((resolve, reject) => {
            readdir(folderPath, (error, fileNames) => {
                error
                    ? reject(error)
                    : resolve(
                          fileNames.map((fileName): string => {
                              return join(folderPath, fileName);
                          })
                      );
            });
        });
    }
}
