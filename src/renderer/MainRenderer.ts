import { createApp } from "vue";
import MainApp from "./Main.vue";
import { vueEventEmitter } from "./VueEventEmitter";
import { VueEvent } from "./VueEvent";

document.addEventListener("keydown", (keyboardEvent: KeyboardEvent) =>
    vueEventEmitter.$emit(VueEvent.GlobalKeyDown, keyboardEvent)
);

createApp(MainApp).mount("#app");
