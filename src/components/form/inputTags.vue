//https://stackoverflow.com/questions/10839570/how-does-stackoverflow-make-its-tag-input-field
//https://zapier.com/blog/best-todo-list-apps/
<template>
  <div class="inputTags">
    <ul v-if="tag.list" ref="tags">
      <template v-for="item in tag.list" :key="item">
        <li v-if="item">
          {{ item }}
        </li>
      </template>
    </ul>
    <searchable-dropdown-list
      tag="tagGenerator"
      :options="tag.list"
      :value="tag.val"
      :strict="!booleanTrue"
      placeholder="Enter tags..."
      icon="fas fa-times"
      @alerts="alerts"
      @input="addTag"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";

import searchableDropdownList from "./searchableDropdownList.vue";

export default defineComponent({
  components: { searchableDropdownList },

  props: {
    tags: {
      type: Array,
      required: false,
      default: () => {
        return [""];
      }
    }
  }, //props

  setup(props, { emit }) {
    const tag = reactive({
      val: "",
      list: [...props.tags]
    });
    // const list = [];
    const booleanTrue = true;

    const addTag = (val: string) => {
      tag.val = val;
      if (!tag.list.includes(tag.val)) {
        tag.list.push(tag.val);
      }
      if (typeof val === "string") {
        emit("input", tag.val);
      }
      tag.val = "";
    };

    const removeTag = (index: number) => {
      tag.list.splice(index, 1);
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let dWarning = "";
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let dDanger = "";
    const alerts = function(type: string, message: string) {
      if (type == "warning") {
        dWarning = message;
      } else if (type == "error") {
        dDanger = message;
      } else {
        alert("error in input alert module");
      }
    };

    return { addTag, removeTag, tag, alerts, booleanTrue };
  }
});
</script>
<style lang="less">
@import (reference) "../../less/customVariables.less";
@import (reference) "../../less/customMixins.less";
.inputTags {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  border: 1px solid black;
  border-radius: @borderRadius;
  max-width: 320px;
  height: fit-content;
  & > ul {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    list-style-type: none;
    flex-wrap: wrap;
    & > li {
      border: 1px solid black;
      border-radius: 2px;
      padding: 1px;
      margin: 1px;
      font-size: @fontSizeSm;
    }
  }
  & > .searchableDropdownList {
    min-width: 100% !important;
    input,
    datalist,
    option {
      width: 100% !important;
    }
    & > .inputResponse {
      display: none !important;
    }
  }
}
</style>
