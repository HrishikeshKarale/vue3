<template>
  <section :class="{ completed: completed }">
    <radio-input
      :label="todo"
      :tag="`task-${id}`"
      :value="completed"
      @selected="val => toggleCompletion(val)"
      @alerts="alerts"
    />
    <vue-button
      tag="deleteTask"
      category="icon-sm"
      icon="fas fa-times"
      :ctx="removeTask.bind(this)"
    />
  </section>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

import { useStore } from "@/store";
import { MutationType } from "@/store/mutations";
import radioInput from "../form/radioInput.vue";
import vueButton from "../vueButton.vue";

export default defineComponent({
  components: { radioInput, vueButton },
  props: {
    id: {
      type: Number,
      require: true
    },
    todo: {
      type: String,
      require: true
    },
    completed: {
      type: Boolean,
      require: true
    }
  },

  setup(props) {
    const store = useStore();
    const booleanTrue = ref(true);

    const toggleCompletion = (completed: boolean): void => {
      store.commit(MutationType.CompleteItem, {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        id: props.id!,
        completed: completed
      });
    };

    const removeTask = (): void => {
      store.commit(MutationType.RemoveItem, {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        id: props.id!
      });
    };

    //used to trigger events if component throws an error
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let dWarning = null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let dDanger = null;
    const alerts = function(type: string, message: string): void {
      if (type == "warning") {
        dWarning = message;
      } else if (type == "error") {
        dDanger = message;
      } else {
        alert("error in input alert module");
      }
    }; //alerts

    return { toggleCompletion, removeTask, alerts, booleanTrue };
  }
});
</script>
<style lang="less">
@import (reference) "../../Less/customVariables.less";
@import (reference) "../../Less/customMixins.less";
section {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-content: center;
  align-self: center;
  margin: @spaceMd @spaceLg;
  padding: @spaceMd @spaceSm;
  border: 1px solid @secondaryColor;
  border-radius: @borderRadius;
  width: 480px;
  height: max-content;
  position: relative;
  background-color: @backgroundColor;
  &.completed {
    .boxShadow(@base, @secondaryColor);
  }
  & > span {
    color: red;
    padding: @spaceMd;
    cursor: pointer;
  }
  & > button {
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
