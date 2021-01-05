<template>
  <vue-form
    :ctx="createTask.bind(this)"
    tag="Create Task"
    :alert="alertObject"
    :validate="!booleanTrue"
    :autocomplete="!booleanTrue"
    @notify="notify"
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
        @notify="notify"
        @value="val => (task = val)"
      />
      <vue-textarea
        label="Description"
        :value="description"
        tag="taskdescription"
        placeholder="Enter details...."
        icon="fas fa-clipboard"
        @notify="notify"
        @value="val => (description = val)"
      />
      <input-tags :tags="tags.list" @value="val => (tags.list = val)" />
    </template>
  </vue-form>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from "vue";

import { useStore } from "@/store";
import { ToDoList, Status } from "@/store/state";
import { MutationType } from "@/store/mutations";
import textInput from "@/components/form/textInput.vue";
import vueTextarea from "@/components/form/vueTextarea.vue";
import vueForm from "@/components/form/vueForm.vue";
import inputTags from "@/components/form/inputTags/inputTags.vue";

export default defineComponent({
  components: { textInput, vueTextarea, vueForm, inputTags },

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
    const alertObject = reactive({
      warning: "",
      error: ""
    });

    const store = useStore();

    const createTask = () => {
      if (task.value) {
        const item: ToDoList = {
          id: Date.now(),
          todo: task.value,
          description: description.value,
          status: Status.created,
          completed: null,
          tags: tags.list
        };
        store.commit(MutationType.CreateItem, item);
        task.value = "";
      } else return;
    };

    //used to trigger events if component throws an error
    const notify = function(type: string, message: string): void {
      if (type == "warning") {
        alertObject.warning = message;
      } else if (type == "error") {
        alertObject.error = message;
      } else {
        alert("error in input alert module");
      }
    }; //alerts

    return {
      createTask,
      task,
      description,
      tags,
      notify,
      alertObject,
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
