import Vue from "vue";
import { vueEventDispatcher } from "../vue-event-dispatcher";
import { VueEventChannels } from "../vue-event-channels";
import { PluginSettings } from "./plugin-settings";
import { UserConfigOptions } from "../../common/config/user-config-options";
import { deepCopy } from "../../common/helpers/object-helpers";
import { defaultMtgOptions } from "../../common/config/mtg-options";

export const mtgSettingsComponent = Vue.extend({
    data() {
        return {
            settingName: PluginSettings.MTG,
            visible: false,
        };
    },
    methods: {
        toggleEnabled() {
            const config: UserConfigOptions = this.config;
            config.mtgOptions.isEnabled = !config.mtgOptions.isEnabled;
            this.updateConfig();
        },
        resetAll() {
            const config: UserConfigOptions = this.config;
            config.mtgOptions = deepCopy(defaultMtgOptions);
            this.updateConfig();
        },
        updateConfig() {
            vueEventDispatcher.$emit(VueEventChannels.configUpdated, this.config);
        },
    },
    props: ["config", "translations"],
    mounted() {
        vueEventDispatcher.$on(VueEventChannels.showSetting, (settingName: string) => {
            if (this.settingName === settingName) {
                this.visible = true;
            } else {
                this.visible = false;
            }
        });
    },
    template: `
    <div v-if="visible">
        <div class="settings__setting-title title is-3">
            <span>
                {{ translations.mtg }}
            </span>
            <div>
                <plugin-toggle :is-enabled="config.mtgOptions.isEnabled" :toggled="toggleEnabled"/>
                <button class="button" @click="resetAll">
                    <span class="icon">
                        <i class="fas fa-undo-alt"></i>
                    </span>
                </button>
            </div>
        </div>
        <p class="settings__setting-description" v-html="translations.mtgDescription"></p>
        <div class="settings__setting-content">
            <div v-if="!config.mtgOptions.isEnabled" class="settings__setting-disabled-overlay"></div>
            <div class="box">
                <div class="settings__option-container">

                <div class="settings__option">
                    <div class="settings__option-name">{{ translations.commandlinePrefix }}</div>
                        <div class="settings__option-content">
                            <div class="field is-grouped is-grouped-right">
                                <div class="control">
                                    <input class="input font-mono" v-model="config.mtgOptions.prefix" @change="updateConfig">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="settings__option">
                        <div class="settings__option-name">{{ translations.mtgShowManacost }}</div>
                        <div class="settings__option-content">
                            <div class="field is-grouped is-grouped-right">
                                <div class="control">
                                    <input id="manacostPreviewToggle" type="checkbox" name="manacostPreviewToggle" class="switch is-rounded is-success" checked="checked" v-model="config.mtgOptions.showManacost" @change="updateConfig()">
                                    <label for="manacostPreviewToggle"></label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
});
