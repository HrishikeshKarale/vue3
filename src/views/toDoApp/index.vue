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
      <div class="head">
        <span class="fas fa-plus">
          CREATE TASK
          <add-task :title="formTitle" />
        </span>
      </div>
      <div class="content">
        <div
          v-for="state in statusList"
          :key="state"
          :id="state"
          v-on:ondrop="drop"
          v-on:ondragover="allowDrop"
        >
          <h4>
            {{ state }}
          </h4>
          <task-list :status="state" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";

import addTask from "@/components/toDoApp/addTask.vue";
import taskList from "@/components/toDoApp/taskList.vue";
// import textInput from "@/components/form/textInput.vue";

import { statusList } from "@/store/state";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/actions";

export default defineComponent({
  components: {
    // textInput,
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

    const drop = event => {
      console.log("drop", event.dataTransfer, event.target, event);
      event.preventDefault();
      const data = event.dataTransfer.getData("text");
      event.target.appendChild(document.getElementById(data));
    };

    const allowDrop = event => {
      console.log("allowDrop", event);
      event.preventDefault();
    };

    return {
      drop,
      allowDrop,
      loading,
      totalCount,
      completedCount,
      formTitle,
      statusList,
      formDecription
    };
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
    & > .head {
      & > span {
        position: relative;
        padding: @spaceMd;
        cursor: pointer;
        &:hover {
          & > form {
            display: flex;
            background-color: @backgroundColor;
            border: 1px solid @secondaryColor;
            border-radius: 0 @borderRadius @borderRadius @borderRadius;
          }
        }
        & > form {
          display: none;
          position: absolute;
          cursor: default;
          top: 100%;
          left: 0;
          z-index: @headerZ;
        }
      }
    }
    & > .content {
      display: flex;
      flex-wrap: nowrap;
      text-align: left;
      position: relative;
      height: 100%;
      & > div {
        display: flex;
        flex-direction: column;
        align-self: flex-start;
        justify-self: center;
        flex-wrap: nowrap;
        flex: 1 1 0;
        margin-top: @spaceXl;
        padding: @spaceSm @spaceMd;
        width: 100%;
        min-height: 50vh;
        margin: 0 @spaceMd;
        background-color: #eee;
        & > h4 {
          align-self: center;
          padding: @spaceMd;
          border-radius: @borderRadius;
          .boxShadow(@base, @secondaryColor);
        }
      }
    }
  }
}
</style>
