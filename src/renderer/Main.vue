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
import { defineComponent } from "vue";
import UserInput from "./Components/UserInput.vue";
import SearchResultList from "./Components/SearchResultList.vue";
import { vueEventEmitter } from "./VueEventEmitter";
import { VueEvent } from "./VueEvent";
import { SearchResultItem } from "../common/SearchResultItem";
import { IpcChannel } from "../common/IpcChannel";

interface Data {
    searchResultItems: SearchResultItem[];
}

export default defineComponent({
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
                    vueEventEmitter.emit(VueEvent.UserInputArrowKeyPressed, keyboardEvent.key);
                    break;

                case "Enter":
                    keyboardEvent.preventDefault();
                    vueEventEmitter.emit(
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

        async onSearchTermChanged(searchTerm: string): Promise<void> {
            try {
                this.searchResultItems = await window.Bridge.ipcRenderer.invoke<string, SearchResultItem[]>(
                    IpcChannel.Search,
                    searchTerm
                );
            } catch (error) {
                console.log(error);
            }
        },

        async onExecutionRequested(searchResultItem: SearchResultItem): Promise<void> {
            try {
                await window.Bridge.ipcRenderer.invoke(IpcChannel.Execute, searchResultItem);
                console.log("done");
            } catch (error) {
                console.log(error);
            }
        },

        onOpenLocationRequested(searchResultItem: SearchResultItem): void {
            window.Bridge.ipcRenderer
                .invoke(IpcChannel.OpenLocation, searchResultItem)
                .then(() => console.log("done"))
                .catch((error) => console.error(error));
        },

        registerIpcEventListeners(): void {
            window.Bridge.ipcRenderer.on(IpcChannel.MainWindowShown, () => {
                vueEventEmitter.emit(VueEvent.MainWindowShown);
            });
        },

        registerVueEventListeners(): void {
            vueEventEmitter.on(VueEvent.GlobalKeyDown, (event?: KeyboardEvent) => {
                if (event) {
                    this.onGlobalKeyDown(event);
                }
            });
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
    --ueli-black-900: #263238;
    --ueli-black-800: #37474f;
    --ueli-black-700: #455a64;
    --ueli-black-600: #546e7a;
    --ueli-black-500: #607d8b;
    --ueli-black-400: #78909c;
    --ueli-black-300: #90a4ae;
    --ueli-black-200: #b0bec5;
    --ueli-black-100: #cfd8dc;
    --ueli-black-50: #eceff1;

    --ueli-white: #fafafa;
    --ueli-blue: #2196f3;

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

    --ueli-scrollbar-size: 8px;
    --ueli-scrollbar-background-color: var(--ueli--black-800);
    --ueli-scrollbar-foreground-color: var(--ueli-black-700);
}

html {
    height: 100%;
}

body {
    margin: 0;
    padding: 0;
    height: 100%;

    background-color: var(--ueli-black-900);
    color: var(--ueli-white);
    font-family: var(--ueli-font-family);
}

#app {
    height: 100%;
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

::-webkit-scrollbar {
    width: var(--ueli-scrollbar-size);
    height: var(--ueli-scrollbar-size);
}

::-webkit-scrollbar-thumb {
    background: var(--ueli-scrollbar-foreground-color);
}

::-webkit-scrollbar-track {
    background: var(--ueli-scrollbar-background-color);
}
</style>
