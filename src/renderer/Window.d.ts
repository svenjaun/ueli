import { Bridge } from "../common/Bridge";

declare global {
    interface Window {
        Bridge: Bridge;
    }
}
