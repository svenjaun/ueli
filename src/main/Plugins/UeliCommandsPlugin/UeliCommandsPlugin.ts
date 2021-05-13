import { ApplicationRuntimeInformation } from "../../ApplicationRuntimeInformation";
import { UeliCommandEvent } from "../../UeliCommandEvent";
import { SearchPlugin } from "../SearchPlugin";
import { UeliCommand } from "./UeliCommand";

export class UeliCommandsPlugin extends SearchPlugin<unknown> {
    public pluginId = "UeliCommandsPlugin";
    protected readonly defaultSettings = {};
    private readonly items: UeliCommand[];

    public constructor(applicationRuntimeInformation: ApplicationRuntimeInformation) {
        super(applicationRuntimeInformation);

        this.items = [
            new UeliCommand("Settings", "Opens ueli's settings", UeliCommandEvent.OpenSettings),
            new UeliCommand("Rescan", "Triggers a rescan for all plugins", UeliCommandEvent.Rescan),
            new UeliCommand("Quit", "Quits ueli", UeliCommandEvent.QuitApp),
        ];
    }

    public rescan(): Promise<void> {
        return Promise.resolve();
    }

    public getAllSearchables(): UeliCommand[] {
        return this.items;
    }

    public clearCache(): Promise<void> {
        return Promise.resolve();
    }
}
