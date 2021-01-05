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
        <task-list status="created" />
      </div>
      <div>
        Completed: <b>{{ completedCount }} / {{ totalCount }}</b>
        <task-list status="complete" />
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
@import (reference) "../../less/customVariables.less";
@import (reference) "../../less/customMixins.less";
.todoApp {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-self: center;
  text-align: center;
  max-width: 1504px;
  height: 100%;
  & > .loaded {
    display: flex;
    text-align: left;
    position: relative;
    height: 100%;
    & > form {
      flex: 1 1 0;
      position: sticky;
      top: @spaceXl;
      max-width: 320px;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex: 3 1 0;
      flex-wrap: nowrap;
      margin-top: @spaceXl;
      padding: @spaceMd;
      width: 100%;
      .scroll(100vh);
      &:last-child {
        flex: 1 1 0;
        background-color: #eee;
      }
    }
  }
}
</style>
