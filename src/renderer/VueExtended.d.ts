import { Bridge } from "../common/Bridge";

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        Bridge: Bridge;
    }
}
