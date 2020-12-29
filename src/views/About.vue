<template>
  <div class="about">
    <h1>This is an about page</h1>
    <input-tags class="tags" :tags="list" @value="val => (list = val)" />
    {{ list }}
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

import inputTags from "@/components/inputTags/inputTags.vue";

export default defineComponent({
  components: {
    inputTags
  },

  setup() {
    const list = ref([]);

    return { list };
  }
});
</script>

<style lang="less">
.about {
  & > .tags {
    width: min-content;
  }
}
</style>
