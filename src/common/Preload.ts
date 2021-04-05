import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";
import { Bridge } from "./Bridge";
import { IpcChannel } from "./IpcChannel";

const bridge: Bridge = {
    ipcRenderer: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        send: (channel: IpcChannel, ...arg: any) =>
            ipcRenderer.send(channel.toString(), arg),

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        sendSync: (channel: IpcChannel, ...arg: any) =>
            ipcRenderer.sendSync(channel.toString(), arg),

        on: (
            channel: IpcChannel,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            listener: (event: IpcRendererEvent, ...args: any[]) => void
        ) => ipcRenderer.on(channel.toString(), listener),

        once: (
            channel: IpcChannel,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            listener: (event: IpcRendererEvent, ...args: any[]) => void
        ) => ipcRenderer.once(channel.toString(), listener),

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        invoke: <T>(channel: IpcChannel, ...arg: any) => {
            return ipcRenderer.invoke(channel, arg) as Promise<T>;
        },
    },
};

contextBridge.exposeInMainWorld("Bridge", bridge);
