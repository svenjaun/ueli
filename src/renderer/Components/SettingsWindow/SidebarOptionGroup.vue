<template>
    <div>
        <div class="group-label">
            {{ optionGroup.label }}
        </div>
        <div class="options">
            <router-link
                v-for="(option, index) in optionGroup.options"
                :key="index"
                class="option"
                :class="{ selected: option.selected }"
                :to="option.path"
                @click="select(index)"
            >
                <i v-if="option.icon !== undefined" class="option-icon bi" :class="option.icon"></i>
                {{ option.label }}
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { SidebarOptionGroup } from "../../SidebarOptionGroup";

export default defineComponent({
    emits: {
        selectionChanged(optionGroupKey: string, selectedIndex: number): boolean {
            return optionGroupKey.length > 0 && selectedIndex >= 0;
        },
    },

    props: {
        optionGroup: {
            type: Object as PropType<SidebarOptionGroup>,
            required: true,
        },
    },

    methods: {
        select(selectedIndex: number): void {
            this.$emit("selectionChanged", this.optionGroup.key, selectedIndex);
        },
    },
});
</script>

<style scoped>
.group-label {
    padding: var(--ueli-spacing-4x) var(--ueli-spacing-4x) 0;
    box-sizing: border-box;
    color: var(--ueli-black-500);
}

.options {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: var(--ueli-spacing-2x) 0;
    box-sizing: border-box;
}

.option {
    padding: var(--ueli-spacing-2x) var(--ueli-spacing-4x);
    box-sizing: border-box;
    cursor: pointer;
    transition: var(--ueli-transition);
    color: var(--ueli-black-300);
    background: var(--ueli-black-900);
    text-decoration: none;
}

.option:hover {
    color: var(--ueli-black-200);
}

.option.selected {
    color: var(--ueli-white);
    background-color: var(--ueli-black-800);
}

.option-icon {
    margin-right: var(--ueli-spacing-1x);
}
</style>
