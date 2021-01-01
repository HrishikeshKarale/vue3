<template lang="html">
  <div class="calculator"></div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const calculation = ref("");

    return { calculation };
  }
});
</script>

<style lang="less">
.calculator {
  display: flex;
}
</style>
