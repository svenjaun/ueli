<template>
    <div class="outer-container">
        <div class="inner-container" :class="{ focussed: isFocussed }">
            <i
                class="search-icon bi-search"
                :class="{ focussed: isFocussed }"
            ></i>
            <input
                class="input"
                type="text"
                autofocus
                @focus="onFocus"
                @blur="onBlur"
                @keydown="onKeyDown"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    data() {
        return {
            isFocussed: false,
        };
    },
    methods: {
        onFocus(): void {
            this.isFocussed = true;
        },

        onBlur(): void {
            this.isFocussed = false;
        },

        onKeyDown(keyboardEvent: KeyboardEvent): void {
            if (keyboardEvent.key === "ArrowDown") {
                keyboardEvent.preventDefault();
                console.log("down");
            }

            if (keyboardEvent.key === "ArrowUp") {
                keyboardEvent.preventDefault();
                console.log("up");
            }
        },
    },
});
</script>

<style scoped>
.outer-container {
    padding: var(--ueli-spacing-4x) var(--ueli-spacing-4x);
    box-sizing: border-box;
    display: flex;
    width: 100%;
    -webkit-app-region: drag;
}

.inner-container {
    padding-bottom: var(--ueli-spacing-2x);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 100%;
    border-bottom: 2px solid var(--ueli-black-10);
    transition: var(--ueli-transition);
    -webkit-app-region: no-drag;
}

.inner-container.focussed {
    border-bottom: 2px solid var(--ueli-blue-dark);
}

.search-icon {
    color: var(--ueli-black-20);
    font-size: var(--ueli-font-size-16);
    transition: var(--ueli-transition);
}

.search-icon.focussed {
    color: var(--ueli-white);
}

.input {
    background-color: transparent;
    border: none;
    color: var(--ueli-white);
    width: 100%;
    font-size: var(--ueli-font-size-24);
    padding: 0 var(--ueli-spacing-2x);
}

.input:focus {
    border: none;
    outline: none;
}
</style>
