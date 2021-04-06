import { exec } from "child_process";

export class PowershellUtility {
    public static executePowershellScript(powershellScript: string): Promise<string> {
        return new Promise((resolve, reject) => {
            exec(`powershell -Command "& {${powershellScript}}"`, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                } else if (stderr) {
                    reject(stderr);
                } else {
                    resolve(stdout);
                }
            });
        });
    }
}
