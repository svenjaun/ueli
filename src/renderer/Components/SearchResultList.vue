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
import { defineComponent, PropType } from "vue";
import SearchResult from "./SearchResult.vue";
import { SearchResultItem } from "../../common/SearchResultItem";
import { vueEventEmitter } from "../VueEventEmitter";
import { VueEvent } from "../VueEvent";

interface Data {
    currentlyHoveredPosition?: number;
}

export default defineComponent({
    emits: {
        executionRequested(searchResultItem: SearchResultItem): boolean {
            return searchResultItem !== undefined;
        },

        openLocationRequested(searchResultItem: SearchResultItem): boolean {
            return searchResultItem !== undefined;
        },
    },

    props: {
        searchResultItems: {
            type: Array as PropType<SearchResultItem[]>,
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
            this.$emit("executionRequested", { ...searchResultItem });
        },

        openLocation(searchResultItem: SearchResultItem): void {
            this.$emit("openLocationRequested", { ...searchResultItem });
        },

        currentlySelectedIndexChange(direction: "ArrowUp" | "ArrowDown"): void {
            const minimumIndex = 0;
            const maximumIndex = this.searchResultItems.length - 1;

            if (this.currentlyHoveredPosition === undefined) {
                this.currentlyHoveredPosition = 0;
                return;
            }

            if (direction === "ArrowUp") {
                this.currentlyHoveredPosition =
                    this.currentlyHoveredPosition === minimumIndex ? maximumIndex : this.currentlyHoveredPosition - 1;
            }

            if (direction === "ArrowDown") {
                this.currentlyHoveredPosition =
                    this.currentlyHoveredPosition === maximumIndex ? minimumIndex : this.currentlyHoveredPosition + 1;
            }

            this.scrollElementIntoViewIfNecessary();
        },

        scrollElementIntoViewIfNecessary(): void {
            const searchResultListContainer = document.getElementById("search-result-list-container") as
                | HTMLDivElement
                | undefined;

            const currentlySelectedElement = document.getElementById(
                `search-result-position-${this.currentlyHoveredPosition}`
            ) as HTMLDivElement | undefined;

            if (searchResultListContainer && currentlySelectedElement) {
                if (this.elementIsOutOfView(searchResultListContainer, currentlySelectedElement)) {
                    currentlySelectedElement.scrollIntoView({ behavior: "smooth" });
                }
            }
        },

        elementIsOutOfView(container: HTMLDivElement, element: HTMLDivElement): boolean {
            const scrolledFromTop = container.scrollTop;
            const scrollContainerHeight = container.clientHeight;
            const elementOffsetTop = element.offsetTop - container.offsetTop;
            const elementHeight = element.clientHeight;

            return (
                scrolledFromTop + scrollContainerHeight <= elementOffsetTop + elementHeight ||
                elementOffsetTop <= scrolledFromTop
            );
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
        vueEventEmitter.on(VueEvent.UserInputArrowKeyPressed, (key?: "ArrowUp" | "ArrowDown") => {
            if (key) {
                this.currentlySelectedIndexChange(key);
            }
        });

        vueEventEmitter.on(VueEvent.UserInputEnterPressed, (ctrlOrMetaPressed?: boolean) => {
            const currentlySelectedItem = this.searchResultItems.find(
                (searchResultItem, index) => index === this.currentlyHoveredPosition
            );

            if (currentlySelectedItem) {
                ctrlOrMetaPressed
                    ? this.openLocation({ ...currentlySelectedItem })
                    : this.execute({ ...currentlySelectedItem });
            }
        });
    },

    watch: {
        searchResultItems() {
            if (this.searchResultItems.length > 0) {
                this.currentlyHoveredPosition = 0;
            }
        },
    },
});
</script>

<style scoped></style>
