<template>
    <div>
        <img class="icon" :src="icon.dataUrl" />
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { DataUrlSearchResultItemIcon } from "../../../common/SearchResult/DataUrlSearchResultItemIcon";

export default defineComponent({
    props: {
        icon: {
            type: Object as PropType<DataUrlSearchResultItemIcon>,
            required: true,
        },
    },
});
</script>

<style scoped>
.icon {
    width: 100%;
    vertical-align: middle;
}
</style>
