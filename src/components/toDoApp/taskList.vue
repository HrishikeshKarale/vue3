<template>
  <task v-for="item in list" :key="item" v-bind="item" />
  {{ list }}
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import task from "@/components/toDoApp/task.vue";

export default defineComponent({
  components: { task },

  setup() {
    const store = useStore();
    const list = computed(() => store.state.list);
    return { list };
  }
});
</script>
