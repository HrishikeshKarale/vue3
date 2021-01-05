<template>
  <div>
    <task
      v-for="item in status ? list.filter(li => li.status === status) : list"
      :key="item"
      v-bind="item"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import task from "@/components/toDoApp/task.vue";

export default defineComponent({
  components: { task },

  props: {
    status: {
      required: false,
      type: String,
      default: ""
    }
  },

  setup() {
    const store = useStore();
    const list = computed(() => Array.from(store.state.list));

    return { list };
  }
});
</script>
