import * as Powershell from "node-powershell";

export class PowershellUtility {
    public static executePowershellScript(
        powershellScript: string,
        shellOptions: Powershell.ShellOptions = { noProfile: true, executionPolicy: "Bypass" }
    ): Promise<string> {
        return new Promise((resolve, reject) => {
            const powershell = new Powershell(shellOptions);

            powershell
                .addCommand(powershellScript)
                .then(() => {
                    powershell
                        .invoke()
                        .then((output) => resolve(output))
                        .catch((error) => reject(`Powershell script execution failed. Reason: ${error}`))
                        .finally(() => powershell.dispose());
                })
                .catch((error) => {
                    reject(`Failed to add powershell command. Reason: ${error}`);
                });
        });
    }
}
