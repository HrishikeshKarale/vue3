<template>
  <form @submit.prevent="createTask">
    <text-input
      :value="task"
      tag="task"
      placeholder="Enter Tasks...."
      :required="booleanTrue"
      icon="fas fa-clipboard"
      @alerts="alerts"
      @input="val => (task = val)"
    />
    <vue-button
      tag="AddTask"
      text="Add"
      :disabled="!task"
      category="small"
      icon="fas fa-plus"
      :ctx="createTask.bind(this)"
    />
  </form>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

import { useStore } from "@/store";
import { ToDoList } from "@/store/state";
import { MutationType } from "@/store/mutations";
import vueButton from "../vueButton.vue";
import textInput from "../form/textInput.vue";

export default defineComponent({
  components: { vueButton, textInput },

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
@import (reference) "../../Less/customVariables.less";
form {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: @spaceMd @spaceLg;
  & > * {
    margin: @spaceSm;
  }
}
</style>
