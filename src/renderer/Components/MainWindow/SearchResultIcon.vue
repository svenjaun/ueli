<template>
    <div>
        <FilePathSearchResultIcon v-if="isFilePathIcon" :icon="icon" />
        <DataUrlSearchResultIcon v-if="isDataUrlIcon" :icon="icon" />
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { SearchResultItemIcon } from "../../../common/SearchResult/SearchResultItemIcon";
import { SearchResultItemIconType } from "../../../common/SearchResult/SearchResultItemIconType";
import FilePathSearchResultIcon from "./FilePathSearchResultIcon.vue";
import DataUrlSearchResultIcon from "./DataUrlSearchResultIcon.vue";

export default defineComponent({
    props: {
        icon: {
            type: Object as PropType<SearchResultItemIcon>,
            required: true,
        },
    },

    components: {
        DataUrlSearchResultIcon,
        FilePathSearchResultIcon,
    },

    computed: {
        isFilePathIcon(): boolean {
            return this.icon.type === SearchResultItemIconType.FilePath;
        },

        isDataUrlIcon(): boolean {
            return this.icon.type === SearchResultItemIconType.DataUrl;
        },
    },
});
</script>
