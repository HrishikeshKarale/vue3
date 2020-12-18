<template>
  <vue-form
    :ctx="createTask.bind(this)"
    dForm="taskForm"
    :alerts="{ error: dDanger, warning: dWarning }"
    :validate="!booleanTrue"
    :autocomplete="booleanTrue"
    @alerts="alerts"
  >
    <text-input
      :value="task"
      tag="task"
      placeholder="Enter Tasks...."
      :required="booleanTrue"
      icon="fas fa-clipboard"
      @alerts="alerts"
      @input="val => (task = val)"
    />
    <vue-textarea
      :value="description"
      tag="task"
      placeholder="Enter Tasks...."
      icon="fas fa-clipboard"
      @alerts="alerts"
      @input="val => (description = val)"
    />
    <!-- <vue-button
      tag="AddTask"
      text="Add"
      :disabled="!task"
      category="small"
      icon="fas fa-plus"
      :ctx="createTask.bind(this)"
    /> -->
  </vue-form>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from "vue";

import { useStore } from "@/store";
import { ToDoList } from "@/store/state";
import { MutationType } from "@/store/mutations";
// import vueButton from "../vueButton.vue";
import textInput from "../form/textInput.vue";
import vueTextarea from "../form/vueTextarea.vue";
import vueForm from "../form/vueForm.vue";

export default defineComponent({
  components: { /*vueButton, */textInput, vueTextarea, vueForm },

  setup() {
    const task = ref("");
    const booleanTrue = true;
    const description = ref("");
    const tags = reactive({ list: [] });

    const store = useStore();

    const createTask = () => {
      if (task.value) {
        const item: ToDoList = {
          id: Date.now(),
          todo: task.value,
          description: description.value,
          status: false,
          completed: null,
          tags: tags.list
        };
        store.commit(MutationType.CreateItem, item);
        task.value = "";
      } else return;
    };

    //used to trigger events if component throws an error
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dWarning = ref("");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dDanger = ref("");
    const alerts = function(type: string, message: string): void {
      if (type == "warning") {
        dWarning.value = message;
      } else if (type == "error") {
        dDanger.value = message;
      } else {
        alert("error in input alert module");
      }
    }; //alerts

    return {
      createTask,
      task,
      description,
      tags,
      alerts,
      dWarning,
      dDanger,
      booleanTrue
    };
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
