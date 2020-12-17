// https://github.com/jsbroks/vuex-typescript-todoapp
<template>
  <div>
    <h1>
      Vue 3 todoApp using typescript and Vuex 4
    </h1>
    <div v-if="loading">
      <h3>
        Loading...
      </h3>
    </div>
    <div v-else>
      <add-task />
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
