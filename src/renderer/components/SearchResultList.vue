<template>
    <div class="container">
        <SearchResultItem
            v-for="(searchResultItem, index) in searchResultItems"
            :key="index"
            :name="searchResultItem.name"
            :description="searchResultItem.description"
            :icon="searchResultItem.icon"
            :position="index"
            @execute="execute(searchResultItem)"
            @openLocation="openLocation(searchResultItem)"
        />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import SearchResultItem from "./SearchResultItem.vue";
import { searchResultItems } from "../SearchResultItems";
import { SearchResultItem as SearchResultItemInterface } from "../../common/SearchResultItem";

export default Vue.extend({
    components: { SearchResultItem },

    data() {
        return {
            searchResultItems,
        };
    },

    methods: {
        execute(searchResultItem: SearchResultItemInterface): void {
            console.log("Execute", searchResultItem.description);
        },

        openLocation(searchResultItem: SearchResultItemInterface): void {
            console.log("Open location", searchResultItem.description);
        },
    },
});
</script>

<style scoped></style>
