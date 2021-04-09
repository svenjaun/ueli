import { OperatingSystem } from "../common/OperatingSystem";

export interface CommandlineSwitchConfiguration {
    operatingSystem?: OperatingSystem;
    commandlineSwitches: string[];
}
