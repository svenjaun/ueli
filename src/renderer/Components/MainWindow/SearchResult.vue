<template>
    <div
        class="container"
        :class="{ hovered: hovered }"
        :id="elementId"
        @click="onClick"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
    >
        <div class="icon-container">
            <SearchResultIcon :icon="item.icon" />
        </div>
        <div class="info-container">
            <div class="name">
                {{ item.name }}
            </div>
            <div class="description">
                {{ item.description }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { SearchResultItem } from "../../../common/SearchResultItem";
import { ObjectUtility } from "../../../common/ObjectUtility";
import SearchResultIcon from "./SearchResultIcon.vue";

export default defineComponent({
    emits: {
        openLocation(item: SearchResultItem): boolean {
            return item !== undefined;
        },

        execute(item: SearchResultItem): boolean {
            return item !== undefined;
        },

        mouseenter(): boolean {
            return true;
        },

        mouseleave(): boolean {
            return true;
        },
    },

    components: {
        SearchResultIcon,
    },

    props: {
        item: {
            type: Object as PropType<SearchResultItem>,
            required: true,
        },

        position: {
            type: Number,
            required: true,
        },

        hovered: {
            type: Boolean,
            required: true,
        },
    },

    computed: {
        elementId(): string {
            return `search-result-position-${this.position}`;
        },
    },

    methods: {
        onClick(mouseEvent: MouseEvent): void {
            if (mouseEvent.ctrlKey || mouseEvent.metaKey) {
                this.$emit("openLocation", ObjectUtility.clone(this.item));
            } else {
                this.$emit("execute", ObjectUtility.clone(this.item));
            }
        },

        onMouseEnter(): void {
            this.$emit("mouseenter");
        },

        onMouseLeave(): void {
            this.$emit("mouseleave");
        },
    },
});
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: var(--ueli-spacing-2x) var(--ueli-spacing-4x);
    box-sizing: border-box;
    transition: var(--ueli-transition);
    user-select: none;
}

.container.hovered {
    background-color: var(--ueli-black-800);
}

.container:active {
    background-color: var(--ueli-black-500);
}

.icon-container {
    height: var(--search-result-icon-size);
    width: var(--search-result-icon-size);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.info-container {
    padding: 0 var(--ueli-spacing-3x);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow: hidden;
}

.name,
.description {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.name {
    font-size: var(--ueli-font-size-16);
    font-weight: var(--ueli-font-weight-600);
    color: var(--ueli-white);
}

.description {
    font-size: var(--ueli-font-size-11);
    font-weight: var(--ueli-font-weight-400);
    color: var(--ueli-black-300);
}
</style>
