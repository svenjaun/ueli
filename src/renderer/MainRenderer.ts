import Vue from "vue";
import MainApp from "@/Main.vue";
import { vueEventEmitter } from "./VueEventEmitter";
import { VueEvent } from "./VueEvent";

document.addEventListener("keydown", (keyboardEvent: KeyboardEvent) =>
    vueEventEmitter.$emit(VueEvent.GlobalKeyDown, keyboardEvent)
);

new Vue({ render: (h) => h(MainApp) }).$mount("#app");
