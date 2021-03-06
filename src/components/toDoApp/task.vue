<template>
  <section class="task">
    <h3 class="title">
      {{ todo }}
    </h3>
    <small v-if="completed">{{ completed }}</small>
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
    <dropdown-list
      tag="tagStatus"
      :value="status"
      :options="statusList"
      :strict="booleanTrue"
      @notify="notify"
      @value="val => toggleCompletion(val)"
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
    const store = useStore();
    const booleanTrue = ref(true);
    const { alertObject } = notify();

    const toggleCompletion = (status: string): void => {
      store.commit(MutationType.CompleteItem, {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        id: props.id!,
        status: status,
        completed: status ? Date() : null
      });
    };

    const removeTask = (): void => {
      store.commit(MutationType.RemoveItem, {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        id: props.id!
      });
    };

    // //used to trigger events if component throws an error
    // // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // let dWarning = "";
    // // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // let dError = "";
    // const alerts = function(type: string, message: string): void {
    //   if (type == "warning") {
    //     dWarning = message;
    //   } else if (type == "error") {
    //     dError = message;
    //   } else {
    //     alert("error in input alert module");
    //   }
    // }; //alerts

    return {
      toggleCompletion,
      removeTask,
      booleanTrue,
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
  width: 480px;
  height: max-content;
  position: relative;
  background-color: @backgroundColor;
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
}
</style>
