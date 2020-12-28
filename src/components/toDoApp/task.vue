<template>
  <section :class="{ status: status }">
    <h3 class="title">
      {{ todo }}
    </h3>
    <small v-if="completed">{{ completed }}</small>
    <p class="description">
      {{ description }}
    </p>
    {{ tags }}
    <vue-button
      tag="completeTask"
      category="small"
      :text="`Mark ${!status ? 'Complete' : 'Incomplete'}`"
      icon="fas fa-tick"
      :ctx="toggleCompletion.bind(this, !status)"
    />
    <vue-button
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

import { useStore } from "@/store";
import { MutationType } from "@/store/mutations";
import vueButton from "../vueButton.vue";

export default defineComponent({
  components: { vueButton },
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
      type: Boolean,
      required: true
    },
    completed: {
      type: String,
      required: false,
      default: null
    },
    tags: {
      type: Array,
      required: false,
      default: null
    }
  },

  setup(props) {
    const store = useStore();
    const booleanTrue = ref(true);

    const toggleCompletion = (status: boolean): void => {
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
  &.status {
    .boxShadow(@base, @secondaryColor);
  }
  & > .title {
    margin-top: 0;
  }
  & > .description {
    padding: @spaceMd @spaceLg;
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
