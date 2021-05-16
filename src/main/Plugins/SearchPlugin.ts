import { join } from "path";
import { ApplicationRuntimeInformation } from "../ApplicationRuntimeInformation";
import { Searchable } from "../Core/Searchable";
import { FileSystemUtility } from "../Utilities/FileSystemUtility";

export abstract class SearchPlugin<PluginSettingsType> {
    public abstract readonly pluginId: string;
    protected abstract readonly defaultSettings: PluginSettingsType;
    private settings?: PluginSettingsType;
    private readonly settingsFileName = "settings.json";

    public abstract getAllSearchables(): Searchable[];
    public abstract rescan(): Promise<void>;
    public abstract clearCache(): Promise<void>;

    protected constructor(protected readonly applicationRuntimeInformation: ApplicationRuntimeInformation) {
        this.settings = undefined;
    }

    public getTemporaryFolderPath(): string {
        return join(this.applicationRuntimeInformation.userDataPath, this.pluginId);
    }

    public getSettingsFilePath(): string {
        return join(this.getTemporaryFolderPath(), this.settingsFileName);
    }

    public async createTemporaryFolder(): Promise<void> {
        return FileSystemUtility.createFolderIfDoesntExist(this.getTemporaryFolderPath());
    }

    public async createSettingsFileIfNotExists(): Promise<void> {
        const fileExists = await FileSystemUtility.pathExists(this.getSettingsFilePath());

        if (fileExists) {
            return;
        }

        return this.writeSettingsToFileSystem(this.defaultSettings);
    }

    protected async getSettings(): Promise<PluginSettingsType> {
        if (this.settings) {
            return this.settings;
        }

        try {
            this.settings = await FileSystemUtility.readJsonFile<PluginSettingsType>(
                join(this.getTemporaryFolderPath(), this.settingsFileName)
            );

            return this.settings;
        } catch (error) {
            console.warn(`Failed to read settings for plugin ${this.pluginId}. Reason: ${error}`);
            return this.defaultSettings;
        }
    }

    protected async updateSettings(updatedSettings: PluginSettingsType): Promise<void> {
        this.settings = updatedSettings;
        return this.writeSettingsToFileSystem(updatedSettings);
    }

    private async writeSettingsToFileSystem(settings: PluginSettingsType): Promise<void> {
        return FileSystemUtility.writeJsonFile<PluginSettingsType>(settings, this.getSettingsFilePath());
    }
}
