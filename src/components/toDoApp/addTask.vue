<template>
  <vue-form
    :ctx="createTask.bind(this)"
    tag="Create Task"
    :alerts="{ error: danger, warning: warning }"
    :validate="!booleanTrue"
    :autocomplete="!booleanTrue"
    @alerts="alerts"
  >
    <template #formDescription>
      <h3>
        {{ title }}
      </h3>
      <p v-if="text">
        {{ text }}
      </p>
    </template>
    <template #formElements>
      <text-input
        label="Task"
        :value="task"
        tag="task"
        placeholder="Enter Tasks...."
        :required="booleanTrue"
        icon="fas fa-clipboard"
        @alerts="alerts"
        @input="val => (task = val)"
      />
      <vue-textarea
        label="Description"
        :value="description"
        tag="task"
        placeholder="Enter Tasks...."
        icon="fas fa-clipboard"
        @alerts="alerts"
        @input="val => (description = val)"
      />
    </template>
  </vue-form>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from "vue";

import { useStore } from "@/store";
import { ToDoList } from "@/store/state";
import { MutationType } from "@/store/mutations";
import textInput from "../form/textInput.vue";
import vueTextarea from "../form/vueTextarea.vue";
import vueForm from "../form/vueForm.vue";

export default defineComponent({
  components: { textInput, vueTextarea, vueForm },

  props: {
    title: {
      type: String,
      required: false
    },
    text: {
      type: String,
      required: false
    }
  }, //props

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
    const warning = ref("");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const danger = ref("");
    const alerts = function(type: string, message: string): void {
      if (type == "warning") {
        warning.value = message;
      } else if (type == "error") {
        danger.value = message;
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
      warning,
      danger,
      booleanTrue
    };
  }
});
</script>
<style lang="less">
@import (reference) "../../less/customVariables.less";
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
