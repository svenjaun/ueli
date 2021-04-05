import { IpcRendererEvent } from "electron";
import { IpcChannel } from "./IpcChannel";

export interface IpcRendererBridge {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    readonly send: (channel: IpcChannel, ...arg: any) => void;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    readonly sendSync: (channel: IpcChannel, ...arg: any) => any;

    readonly on: (
        channel: IpcChannel,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        listener: (event: IpcRendererEvent, ...arg: any) => void
    ) => void;

    readonly once: (
        channel: IpcChannel,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        listener: (event: IpcRendererEvent, ...arg: any) => void
    ) => void;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    readonly invoke: <T>(channel: IpcChannel, ...arg: any) => Promise<T>;
}

export interface Bridge {
    readonly ipcRenderer: IpcRendererBridge;
}
