<template>
    <div
        class="container"
        :class="{ hovered: hovered }"
        @click="onClick"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
        :id="elementId"
    >
        <div class="icon-container">
            <img class="icon" :src="icon" />
        </div>
        <div class="info-container">
            <div class="name">
                {{ name }}
            </div>
            <div class="description">
                {{ description }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    props: {
        position: {
            type: Number,
            required: true,
        },

        name: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        icon: {
            type: String,
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
                this.$emit("openLocation");
            } else {
                this.$emit("execute");
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
    background-color: var(--ueli-black-10);
}

.container:active {
    background-color: var(--ueli-black-10);
}

.container:active > .icon-container > .icon {
    transform: scale(1.1);
}

.icon {
    width: 40px;
    height: 40px;
    opacity: 0.75;
    box-shadow: 0 0 var(--ueli-spacing-2x) rgba(0, 0, 0, 0.25);
    transition: var(--ueli-transition);
}

.info-container {
    padding: 0 var(--ueli-spacing-4x);
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
    color: var(--ueli-black-90);
}
</style>
