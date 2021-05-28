import { ExecutionPlugin } from "../../execution-plugin";
import { SearchResultItem } from "../../../common/search-result-item";
import { TranslationSet } from "../../../common/translation/translation-set";
import { PluginType } from "../../plugin-type";
import { UrlOptions } from "../../../common/config/url-options";
import { MtgOptions } from "../../../common/config/mtg-options";
import { UserConfigOptions } from "../../../common/config/user-config-options";
import { someRandomIcon } from "../../../common/icon/default-icons";

export class MtgPlugin implements ExecutionPlugin {
    public readonly pluginType = PluginType.Url;
    private config: MtgOptions;

    constructor(config: UrlOptions) {
        this.config = config;
    }
    isValidUserInput(userInput: string, fallback?: boolean): boolean {
        console.log("isValidUserInput");
        return true;
    }
    getSearchResults(userInput: string, fallback?: boolean): Promise<SearchResultItem[]> {
        console.log("getSearchResults", userInput);
        return new Promise( (resolve) => {
            resolve(this.makeSomeShit(userInput));
        })
    }
    updateConfig(updatedConfig: UserConfigOptions, translationSet: TranslationSet): Promise<void> {
        console.log("updateConfig");
        return new Promise((resolve) => {
            resolve();
        });
    }

    public isEnabled(): boolean {
        return this.config.isEnabled;
    }

    public execute(searchResultItem: SearchResultItem, privileged: boolean): Promise<void> {
        console.log("Execute Order 66: ", searchResultItem.executionArgument);
        
        return new Promise((resolve) => {
            resolve()
        });
    }

    private makeSomeShit(userInput: string) : SearchResultItem[] {
        let results = [];
        let result: SearchResultItem = {
            description: `Lol this is description: ${userInput}`,//this.translationSet.openNewMail,
            executionArgument: `Make the execution xy: ${userInput}`,
            hideMainWindowAfterExecution: true,
            icon: someRandomIcon,
            name: userInput,
            originPluginType: this.pluginType,
            searchable: [],
        };
        results.push(result);
        return results;
    }
}
