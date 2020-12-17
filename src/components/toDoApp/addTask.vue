<template>
  <form @submit.prevent="createTask">
    <input
      v-once
      type="text"
      placeholder="Enter task that needs to be completed..."
      v-model="task"
    />
    <button type="submit">Add</button>
  </form>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

import { useStore } from "@/store";
import { ToDoList } from "@/store/state";
import { MutationType } from "@/store/mutations";

export default defineComponent({
  setup() {
    const task = ref("");
    const store = useStore();

    const createTask = () => {
      if (task.value) {
        const item: ToDoList = {
          id: Date.now(),
          todo: task.value,
          completed: false
        };
        store.commit(MutationType.CreateItem, item);
        task.value = "";
      } else return;
    };
    return { createTask, task };
  }
});
</script>
