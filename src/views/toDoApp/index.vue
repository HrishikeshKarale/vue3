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
      <div>
        <add-task />
        <span>
          Completed: <b>{{ completedCount }} / {{ totalCount }}</b>
        </span>
      </div>
      <task-list />
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
    const store = useStore();

    const loading = computed(() => store.state.loading);

    onMounted(() => store.dispatch(ActionTypes.GetToDoItems));

    const completedCount = computed(() => store.getters.completedCount);
    const totalCount = computed(() => store.getters.totalCount);

    return { loading, totalCount, completedCount };
  }
});
</script>
<style lang="less">
.todoApp {
  display: flex;
  flex-direction: column;
  & > .loaded {
    display: flex;
    flex-direction: column;
    & > div {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-evenly;
      align-content: center;
      & > span {
        height: fit-content;
      }
    }
  }
}
</style>
