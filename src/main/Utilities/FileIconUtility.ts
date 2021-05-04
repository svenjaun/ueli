import { app } from "electron";

export class FileIconUtility {
    public static async getIconDataUrlFromFilePath(filePath: string): Promise<string> {
        const nativeImage = await app.getFileIcon(filePath);
        return nativeImage.toDataURL();
    }
}
