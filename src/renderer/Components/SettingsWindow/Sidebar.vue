<template>
    <div>
        <SidebarOptionGroupComponent
            v-for="(optionGroup, index) in optionGroups"
            :key="index"
            :optionGroup="optionGroup"
            @selectionChanged="selectionChanged"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SidebarOptionGroupComponent from "./SidebarOptionGroup.vue";
import { SidebarOptionGroup } from "../../SidebarOptionGroup";

export default defineComponent({
    components: {
        SidebarOptionGroupComponent,
    },

    data(): { optionGroups: SidebarOptionGroup[] } {
        return {
            optionGroups: [
                {
                    label: "ueli",
                    key: "ueli",
                    options: [
                        {
                            label: "General",
                            path: "/general",
                            icon: "bi-gear-wide-connected",
                        },
                        {
                            label: "Search Engine",
                            path: "/search-engine",
                            icon: "bi-search",
                        },
                    ],
                },
            ],
        };
    },

    methods: {
        selectionChanged(groupKey: string, selectedIndex: number): void {
            this.optionGroups.forEach((optionGroup) => {
                if (optionGroup.key === groupKey) {
                    optionGroup.options.forEach((option, index) => {
                        const selected = index === selectedIndex;
                        option.selected = selected;
                    });
                }
            });
        },

        registerNavigationEventListeners(): void {
            this.$router.afterEach((navigatedTo) => {
                this.optionGroups.forEach((optionGroup) => {
                    optionGroup.options.forEach((option, index) => {
                        if (option.path === navigatedTo.path) {
                            this.selectionChanged(optionGroup.key, index);
                        }
                    });
                });
            });
        },
    },

    mounted(): void {
        this.registerNavigationEventListeners();
        this.$router.push("/general");
    },
});
</script>

<style scoped></style>
