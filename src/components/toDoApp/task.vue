<template>
  <section>
    <radio-input
      :label="todo"
      :name="`task-${id}`"
      :value="completed"
      :inline="booleanTrue"
      @selected="val => toggleCompletion(val)"
      @alerts="alerts"
    />
    <span class="fas fa-minus-square" @click.prevent="toggleCompletion()" />
  </section>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

import { useStore } from "@/store";
import { MutationType } from "@/store/mutations";
import radioInput from "../form/radioInput.vue";

export default defineComponent({
  components: { radioInput },
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

    return { toggleCompletion, alerts, booleanTrue };
  }
});
</script>
<style lang="less">
section {
  display: flex;
  // & > label {
  //   padding: 8px 16px;
  //   border: 1px solid black;
  //   border-radius: 4px;
  //   display: flex;
  //   flex-direction: row;
  //   flex-wrap: nowrap;
  //   justify-content: center;
  //   align-content: center;
  // }
}
</style>
