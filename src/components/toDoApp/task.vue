<template>
  <section>
    <h3>
      {{ todo }}
    </h3>
    <label>
      <input
        type="checkbox"
        :checked="completed"
        @change="toggleCompletion()"
      />
      {{ completed }}
    </label>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import { useStore } from "@/store";
import { MutationType } from "@/store/mutations";

export default defineComponent({
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

    const toggleCompletion = () => {
      store.commit(MutationType.CompleteItem, {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        id: props.id!,
        completed: !props.completed
      });
    };

    return { toggleCompletion };
  }
});
</script>
<style lang="less"></style>
