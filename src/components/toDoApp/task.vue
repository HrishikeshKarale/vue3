<template>
  <!-- <section
    class="task"
    :id="id"
    @mousedown="pickup(id)"
    @mousemove="drag(id)"
    @mouseup="drop(id)"
    draggable="true"
  > -->
  <section
    class="task"
    :id="id"
    v-on:ondragStart="drag"
    :draggable="booleanTrue"
  >
    <h3 class="title">
      {{ todo }}
    </h3>
    <small v-if="completed">{{ completed }}</small>
    <dropdown-list
      id="statusToggle"
      tag="tagStatus"
      :value="status"
      :options="statusList"
      :strict="strict"
      @notify="notify"
      @value="val => toggleState(val)"
    />
    <p v-if="status !== 'complete'" class="description">
      {{ description }}
    </p>
    <ul v-if="tags && !completed" class="tags">
      <li v-for="tag in tags" :key="tag">
        <span class="fas fa-tag" />
        {{ tag }}
      </li>
    </ul>
    <vue-button
      v-if="!completed"
      class="deleteButton"
      tag="deleteTask"
      category="icon-sm"
      icon="fas fa-times"
      :ctx="removeTask.bind(this)"
    />
  </section>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

import { statusList } from "@/store/state";
import { useStore } from "@/store";
import { MutationType } from "@/store/mutations";

import notify from "@/typeScript/notify";

import dropdownList from "@/components/form/dropdownList.vue";
import vueButton from "@/components/button/vueButton.vue";

export default defineComponent({
  components: { vueButton, dropdownList },
  props: {
    id: {
      type: Number,
      required: true
    },
    todo: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    completed: {
      type: String,
      required: false,
      default: ""
    },
    tags: {
      type: Array,
      required: false,
      default: () => []
    }
  },

  setup(props) {
    const booleanTrue = true;
    const pickedUp = !booleanTrue;
    const store = useStore();
    const strict = ref(booleanTrue);
    const { alertObject } = notify();

    const toggleState = (status: string): void => {
      store.commit(MutationType.CompleteItem, {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        id: props.id!,
        status: status,
        completed: status === "complete" ? Date() : null
      });
    };

    // const pickup = elementId => {
    //   const element = document.getElementById(elementId);
    //   element.style.position = "absolute";
    //   pickedUp = true;
    // }; //pick

    // const drag = elementId => {
    //   const element = document.getElementById(elementId);
    //   if (pickedUp) {
    //     element.style.left = event.clientX + 80 + "px";
    //     element.style.top = event.clientY + 80 + "px";
    //   }
    // }; //drag

    // const drop = elementId => {
    //   pickedUp = false;
    // }; //drop

    const removeTask = (): void => {
      store.commit(MutationType.RemoveItem, {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        id: props.id!
      });
    };

    const drag = event => {
      event.target.style.display = "none";
      console.log("drag", event.target);
      event.dataTransfer.setDate("text", event.target);
    };

    return {
      // pickup,
      drag,
      // drop,
      booleanTrue,
      toggleState,
      removeTask,
      strict,
      statusList,
      notify,
      alertObject
    };
  }
});
</script>
<style lang="less">
@import (reference) "../../less/customVariables.less";
@import (reference) "../../less/customMixins.less";

section.task {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-content: center;
  align-self: center;
  margin: @spaceMd @spaceLg;
  padding: @spaceLg;
  border: 1px solid @secondaryColor;
  border-radius: @borderRadius;
  min-width: 240px;
  height: max-content;
  position: relative;
  background-color: @backgroundColor;
  cursor: grab;

  & > .title {
    margin-top: 0;
  }
  & > .description {
    padding: @spaceMd @spaceLg;
  }
  & > ul.tags {
    display: flex;
    flex-wrap: wrap;
    & > li {
      display: flex;
      flex-wrap: nowrap;
      padding: 0 @spaceSm;
      border: 1px solid @secondaryColor;
      margin: @spaceXs @spaceSm;
      & > span {
        align-self: center;
        padding: @spaceSm;
        margin-right: @spaceSm;
        font-size: @fontSizeSm;
      }
    }
  }
  & > button,
  & > small {
    align-self: flex-end;
  }
  & > small {
    color: green;
  }
  & > button.deleteButton {
    position: absolute;
    right: @spaceSm;
    top: @spaceSm;
  }
  & > #statusToggle {
    align-self: flex-end;
    width: fit-content;
    min-width: 64px;
    & > .inputResponse {
      display: none;
    }
    & > div:first-child {
      min-width: 64px;
      width: fit-content;
      & > select {
        width: fit-content;
        & > option {
          width: fit-content;
        }
      }
    }
  }
}
</style>
