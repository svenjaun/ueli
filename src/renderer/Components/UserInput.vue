<template>
    <div class="outer-container">
        <div class="inner-container" :class="{ focussed: isFocussed }">
            <i class="search-icon bi-search"></i>
            <input
                ref="userInput"
                class="input"
                type="text"
                autofocus
                v-model="searchTerm"
                @focus="onFocus"
                @blur="onBlur"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { VueEvent } from "../VueEvent";
import { vueEventEmitter } from "../VueEventEmitter";

export default Vue.extend({
    data() {
        return {
            isFocussed: false,
            searchTerm: "",
        };
    },

    methods: {
        focusOnUserInput(): void {
            const $userInput = this.$refs.userInput as HTMLInputElement;
            $userInput.focus();
        },

        onFocus(): void {
            this.isFocussed = true;
        },

        onBlur(): void {
            this.isFocussed = false;
        },

        registerVueEventListeners(): void {
            vueEventEmitter.$on(VueEvent.MainWindowShown, () => this.focusOnUserInput());
        },
    },

    watch: {
        searchTerm() {
            this.$emit("searchTermChanged", this.searchTerm);
        },
    },

    mounted() {
        this.registerVueEventListeners();
    },
});
</script>

<style scoped>
.outer-container {
    padding: var(--ueli-spacing-4x) var(--ueli-spacing-4x);
    box-sizing: border-box;
    display: flex;
    width: 100%;
    -webkit-app-region: drag;
}

.inner-container {
    padding-bottom: var(--ueli-spacing-2x);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 100%;
    border-bottom: 2px solid var(--ueli-black-10);
    transition: var(--ueli-transition);
    -webkit-app-region: no-drag;
}

.inner-container.focussed {
    border-bottom: 2px solid var(--ueli-blue);
}

.search-icon {
    color: var(--ueli-white);
    font-size: var(--ueli-font-size-16);
    transition: var(--ueli-transition);
}

.input {
    background-color: transparent;
    border: none;
    color: var(--ueli-white);
    width: 100%;
    font-size: var(--ueli-font-size-24);
    padding: 0 var(--ueli-spacing-2x);
}

.input:focus {
    border: none;
    outline: none;
}
</style>
