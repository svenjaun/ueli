<template>
    <div class="container">
        <SearchResult
            v-for="(searchResultItem, index) in searchResultItems"
            :key="index"
            :name="searchResultItem.name"
            :description="searchResultItem.description"
            :icon="searchResultItem.icon"
            :position="index"
            :hovered="currentlyHoveredPosition === index"
            @mouseenter="onMouseEnter(index)"
            @mouseleave="onMouseLeave(index)"
            @execute="execute(searchResultItem)"
            @openLocation="openLocation(searchResultItem)"
        />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import SearchResult from "./SearchResult.vue";
import { SearchResultItem } from "../../common/SearchResultItem";
import { vueEventEmitter } from "../VueEventEmitter";
import { VueEvent } from "../VueEvent";

interface Data {
    currentlyHoveredPosition?: number;
}

export default Vue.extend({
    props: {
        searchResultItems: {
            type: Array as () => SearchResultItem[],
            required: true,
        },
    },

    components: { SearchResult },

    data(): Data {
        return {
            currentlyHoveredPosition: 0,
        };
    },

    methods: {
        execute(searchResultItem: SearchResultItem): void {
            this.$emit("executionRequested", searchResultItem);
        },

        openLocation(searchResultItem: SearchResultItem): void {
            this.$emit("openLocationRequested", searchResultItem);
        },

        currentlySelectedIndexChange(direction: string): void {
            const minimumIndex = 0;
            const maximumIndex = this.searchResultItems.length - 1;

            if (this.currentlyHoveredPosition === undefined) {
                this.currentlyHoveredPosition = 0;
                return;
            }

            if (direction === "ArrowUp") {
                this.currentlyHoveredPosition =
                    this.currentlyHoveredPosition === minimumIndex ? maximumIndex : this.currentlyHoveredPosition - 1;
            } else if (direction === "ArrowDown") {
                this.currentlyHoveredPosition =
                    this.currentlyHoveredPosition === maximumIndex ? minimumIndex : this.currentlyHoveredPosition + 1;
            }
        },

        onMouseEnter(position: number): void {
            this.currentlyHoveredPosition = position;
        },

        onMouseLeave(position: number): void {
            if (this.currentlyHoveredPosition === position) {
                this.currentlyHoveredPosition = undefined;
            }
        },
    },

    mounted(): void {
        vueEventEmitter.$on(VueEvent.UserInputArrowKeyPressed, (key: string) => {
            this.currentlySelectedIndexChange(key);
        });

        vueEventEmitter.$on(VueEvent.UserInputEnterPressed, (ctrlOrMetaPressed: boolean) => {
            const currentlySelectedItem = this.searchResultItems.find(
                (searchResultItem, index) => index === this.currentlyHoveredPosition
            );

            if (currentlySelectedItem) {
                ctrlOrMetaPressed ? this.openLocation(currentlySelectedItem) : this.execute(currentlySelectedItem);
            }
        });
    },
});
</script>

<style scoped></style>
