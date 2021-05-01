import { ApplicationRuntimeInformation } from "./ApplicationRuntimeInformation";

export class DummyApplicationRuntimeInformation {
    public static empty({
        executablePath = "",
        temporaryDirectoryPath = "",
        userDataPath = "",
        userHomePath = "",
    } = {}): ApplicationRuntimeInformation {
        return {
            executablePath,
            temporaryDirectoryPath,
            userDataPath,
            userHomePath,
        };
    }
}
