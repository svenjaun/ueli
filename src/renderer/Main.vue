<template>
    <div class="main-container">
        <div class="user-input-container">
            <UserInput @searchTermChanged="onSearchTermChanged" />
        </div>
        <div class="search-result-list-container" id="search-result-list-container">
            <SearchResultList
                :searchResultItems="searchResultItems"
                @executionRequested="onExecutionRequested"
                @openLocationRequested="onOpenLocationRequested"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import UserInput from "@/Components/UserInput.vue";
import SearchResultList from "@/Components/SearchResultList.vue";
import { vueEventEmitter } from "./VueEventEmitter";
import { VueEvent } from "./VueEvent";
import { SearchResultItem } from "../common/SearchResultItem";
import { IpcChannel } from "../common/IpcChannel";

interface Data {
    searchResultItems: SearchResultItem[];
}

export default Vue.extend({
    components: {
        SearchResultList,
        UserInput,
    },

    data(): Data {
        return {
            searchResultItems: [],
        };
    },

    methods: {
        onGlobalKeyDown(keyboardEvent: KeyboardEvent): void {
            switch (keyboardEvent.key) {
                case "ArrowUp":
                case "ArrowDown":
                    keyboardEvent.preventDefault();
                    vueEventEmitter.$emit(VueEvent.UserInputArrowKeyPressed, keyboardEvent.key);
                    break;

                case "Enter":
                    keyboardEvent.preventDefault();
                    vueEventEmitter.$emit(
                        VueEvent.UserInputEnterPressed,
                        keyboardEvent.ctrlKey || keyboardEvent.metaKey
                    );
                    break;

                case "Escape":
                    keyboardEvent.preventDefault();
                    window.Bridge.ipcRenderer.send(IpcChannel.EscapePressed);
                    break;
            }
        },

        onSearchTermChanged(searchTerm: string): void {
            window.Bridge.ipcRenderer
                .invoke<SearchResultItem[]>(IpcChannel.Search, searchTerm)
                .then((result) => (this.searchResultItems = result))
                .catch((error) => console.error(error));
        },

        onExecutionRequested(searchResultItem: SearchResultItem): void {
            window.Bridge.ipcRenderer
                .invoke(IpcChannel.Execute, searchResultItem)
                .then(() => console.log("done"))
                .catch((error) => console.error(error));
        },

        onOpenLocationRequested(searchResultItem: SearchResultItem): void {
            window.Bridge.ipcRenderer
                .invoke(IpcChannel.OpenLocation, searchResultItem)
                .then(() => console.log("done"))
                .catch((error) => console.error(error));
        },

        registerIpcEventListeners(): void {
            window.Bridge.ipcRenderer.on(IpcChannel.MainWindowShown, () => {
                vueEventEmitter.$emit(VueEvent.MainWindowShown);
            });
        },

        registerVueEventListeners(): void {
            vueEventEmitter.$on(VueEvent.GlobalKeyDown, (keyboardEvent: KeyboardEvent) =>
                this.onGlobalKeyDown(keyboardEvent)
            );
        },
    },

    mounted() {
        this.registerIpcEventListeners();
        this.registerVueEventListeners();
    },
});
</script>

<style>
:root {
    --ueli-black: #2f3640;
    --ueli-black-10: #353b48;
    --ueli-black-20: #718093;
    --ueli-black-40: #7f8fa6;

    --ueli-white: #fff;
    --ueli-white-05: #f5f6fa;
    --ueli-white-10: #dcdde1;

    --ueli-blue-dark: #0097e6;
    --ueli-blue-bright: #00a8ff;

    --ueli-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
        "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";

    --ueli-font-size-11: 11px;
    --ueli-font-size-13: 13px;
    --ueli-font-size-16: 16px;
    --ueli-font-size-24: 24px;

    --ueli-font-weight-400: 400;
    --ueli-font-weight-600: 600;

    --ueli-spacing-1x: 4px;
    --ueli-spacing-2x: 8px;
    --ueli-spacing-3x: 12px;
    --ueli-spacing-4x: 16px;

    --ueli-transition: 100ms ease-in-out all;
}

html {
    height: 100%;
}

body {
    margin: 0;
    padding: 0;
    height: 100%;

    background-color: var(--ueli-black);
    color: var(--ueli-white-05);
    font-family: var(--ueli-font-family);
}
</style>

<style scoped>
.main-container {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.user-input-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
}

.search-result-list-container {
    width: 100%;
    flex-grow: 1;
    overflow-y: auto;
}
</style>
