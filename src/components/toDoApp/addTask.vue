<template>
  <form @submit.prevent="createTask">
    <input
      v-once
      type="text"
      placeholder="Enter task that needs to be completed..."
      v-model="task"
    />
    <button @click="createTask">+ ADD TASK</button>
    <!-- <vue-button
      name="AddTask"
      text="Add"
      icon="fas fa-plus"
      :disabled="!task"
      style="small"
      :ctx="createTask.bind(this)"
    /> -->
  </form>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

import { useStore } from "@/store";
import { ToDoList } from "@/store/state";
import { MutationType } from "@/store/mutations";
// import vueButton from "../vueButton.vue";

export default defineComponent({
  // components: { vueButton },

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
<style lang="less">
form {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 16px 32px;
}
</style>
