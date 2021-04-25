import { createApp } from "vue";
import { VueEvent } from "./VueEvent";
import { vueEventEmitter } from "./VueEventEmitter";
import Main from "./Main.vue";

document.addEventListener("keydown", (keyboardEvent: KeyboardEvent) =>
    vueEventEmitter.emit<KeyboardEvent>(VueEvent.GlobalKeyDown, keyboardEvent)
);

createApp(Main).mount("#app");
