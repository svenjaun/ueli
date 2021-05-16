import { OperatingSystem } from "../common/OperatingSystem/OperatingSystem";

export interface CommandlineSwitchConfiguration {
    operatingSystem?: OperatingSystem;
    commandlineSwitches: string[];
}
