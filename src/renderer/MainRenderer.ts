import Vue from "vue";
import MainApp from "@/Main.vue";
import { IpcChannel } from "../common/IpcChannel";
import { vueEventEmitter } from "./VueEventEmitter";
import { VueEvent } from "./VueEvent";

document.addEventListener("keydown", (keyboardEvent: KeyboardEvent) =>
    vueEventEmitter.$emit(VueEvent.GlobalKeyDown, keyboardEvent)
);

new Vue({
    render: (h) => h(MainApp),
    mounted() {
        window.Bridge.ipcRenderer.send(IpcChannel.rendererReady);
    },
}).$mount("#app");
