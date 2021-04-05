import Vue from "vue";
import App from "@/App.vue";
import { IpcChannel } from "../common/IpcChannel";

new Vue({
    render: (h) => h(App),
    mounted() {
        window.Bridge.ipcRenderer.send(IpcChannel.rendererReady);
    },
}).$mount("#app");
