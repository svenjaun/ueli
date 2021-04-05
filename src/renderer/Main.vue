<template>
    <div class="main-container">
        <div class="user-input-container">
            <UserInput />
        </div>
        <div class="search-result-list-container">
            <SearchResultList />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import UserInput from "@/components/UserInput.vue";
import SearchResultList from "@/components/SearchResultList.vue";

export default Vue.extend({
    components: {
        SearchResultList,
        UserInput,
    },
});
</script>

<style>
:root {
    --ueli-black: #1e272e;
    --ueli-black-10: #485460;
    --ueli-black-20: #808e9b;

    --ueli-white: #fff;
    --ueli-white-05: #d2dae2;

    --ueli-green-dark: #05c46b;
    --ueli-green-bright: #0be881;

    --ueli-blue-dark: #0fbcf9;
    --ueli-blue-bright: #4bcffa;

    --ueli-purple-dark: #3c40c6;
    --ueli-purple-bright: #575fcf;

    --ueli-pink-dark: #ef5777;
    --ueli-pink-bright: #f53b57;

    --ueli-red-dark: #ff3f34;
    --ueli-red-bright: #ff5e57;

    --ueli-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
        "Segoe UI Symbol";

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
