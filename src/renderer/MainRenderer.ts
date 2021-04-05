import Vue from "vue";
import MainApp from "@/Main.vue";
import { IpcChannel } from "../common/IpcChannel";

new Vue({
    render: (h) => h(MainApp),
    mounted() {
        window.Bridge.ipcRenderer.send(IpcChannel.rendererReady);
    },
}).$mount("#app");
