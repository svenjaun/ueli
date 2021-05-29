import { ExecutionPlugin } from "../../execution-plugin";
import { SearchResultItem } from "../../../common/search-result-item";
import { TranslationSet } from "../../../common/translation/translation-set";
import { PluginType } from "../../plugin-type";
import { MtgOptions } from "../../../common/config/mtg-options";
import { UserConfigOptions } from "../../../common/config/user-config-options";
import { Card, getCardSuggestions, getIconType } from "./mtg-helper";

export class MtgPlugin implements ExecutionPlugin {
    public readonly pluginType = PluginType.MTG;
    private readonly urlExecutor: (url: string) => Promise<void>;
    private config: MtgOptions;
    private maxSearchResultPerPage: number;

    constructor(config: MtgOptions, maxSearchResultPerPage: number, urlExecutor: (url: string) => Promise<void>) {
        this.config = config;
        this.urlExecutor = urlExecutor;
        this.maxSearchResultPerPage = maxSearchResultPerPage;
    }

    isValidUserInput(userInput: string, fallback?: boolean): boolean {
        return userInput.indexOf(this.config.prefix) !== -1 && userInput.length > this.config.prefix.length;
    }

    getSearchResults(userInput: string, fallback?: boolean): Promise<SearchResultItem[]> {
        // When problems with async occur, change to await to .then
        return new Promise(async (resolve) => {
            let result = await getCardSuggestions(userInput.split(this.config.prefix)[1], this.maxSearchResultPerPage);
            resolve(this.generateSearchResultItems(result));
        });
    }

    updateConfig(updatedConfig: UserConfigOptions, translationSet: TranslationSet): Promise<void> {
        return new Promise((resolve) => {
            this.config = updatedConfig.mtgOptions;
            this.maxSearchResultPerPage = updatedConfig.appearanceOptions.maxSearchResultsPerPage;
            resolve();
        });
    }

    public isEnabled(): boolean {
        return this.config.isEnabled;
    }

    public execute(searchResultItem: SearchResultItem, privileged: boolean): Promise<void> {
        return this.urlExecutor(searchResultItem.executionArgument);
    }

    private generateSearchResultItems(cards: Card[]): SearchResultItem[] {
        let results: SearchResultItem[] = [];
        for (let card of cards) {
            let result: SearchResultItem = {
                description: card.text ? `${card.text}` : `${card.type}`,
                executionArgument: `https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=${card.id}`,
                hideMainWindowAfterExecution: true,
                icon: getIconType(card.manaCost, card.colors),
                name: this.config.showManacost ? `${card.name} - ${card.manaCost}` : `${card.name}`,
                originPluginType: this.pluginType,
                searchable: [],
            };
            if (!results.some(cardFilter => cardFilter.name == result.name)) {
                results.push(result);
            }
        }
        return results;
    }
}