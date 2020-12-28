// https://github.com/jsbroks/vuex-typescript-todoapp
<template>
  <div class="todoApp">
    <h2>
      ToDo App
    </h2>
    <p>
      Plan manage and track all your tasks in one simpel module.
    </p>
    <h3 v-if="loading">
      Loading...
    </h3>
    <div v-else class="loaded">
      <add-task :title="formTitle" />
      <div>
        <div>
          Completed: <b>{{ completedCount }} / {{ totalCount }}</b>
        </div>
        <task-list />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";

import addTask from "../../components/toDoApp/addTask.vue";
import taskList from "../../components/toDoApp/taskList.vue";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/actions";

export default defineComponent({
  name: "toDoApp",

  components: {
    taskList,
    addTask
  },
  setup() {
    const formTitle = "Create Task";

    const formDecription =
      "Use this form to create task by filling out the fields below.";

    const store = useStore();

    const loading = computed(() => store.state.loading);

    onMounted(() => store.dispatch(ActionTypes.GetToDoItems));

    const completedCount = computed(() => store.getters.completedCount);
    const totalCount = computed(() => store.getters.totalCount);

    return { loading, totalCount, completedCount, formTitle, formDecription };
  }
});
</script>
<style lang="less">
@import (reference) "../../Less/customVariables.less";
@import (reference) "../../Less/customMixins.less";
.todoApp {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-self: center;
  text-align: center;
  max-width: 1504px;
  & > .loaded {
    display: flex;
    text-align: left;
    position: relative;
    & > form {
      position: sticky;
      top: @spaceXl;
      max-width: 320px;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      margin-top: @spaceXl;
      padding: @spaceMd;
      width: 100%;
      .scroll(100vh);
      & > div {
        &:first-child {
          align-self: flex-end;
        }
      }
    }
  }
}
</style>
