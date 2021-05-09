<template>
    <div>
        <img class="icon" :src="icon.filePath" />
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { LocalFilePathSearchResultItemIcon } from "../../../common/LocalFilePathSearchResultItemIcon";

export default defineComponent({
    props: {
        icon: {
            type: Object as PropType<LocalFilePathSearchResultItemIcon>,
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
