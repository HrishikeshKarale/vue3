//https://stackoverflow.com/questions/10839570/how-does-stackoverflow-make-its-tag-input-field
//https://zapier.com/blog/best-todo-list-apps/
<template>
  <div class="inputTags">
    <searchable-dropdown-list
      tag="tagGenerator"
      :options="tag.list"
      :value="tag.val"
      :strict="!booleanTrue"
      placeholder="Enter tags..."
      :maxlength="maxlength"
      icon="fas fa-tags"
      @alerts="alerts"
      @input="addTag"
    />
    <ul v-if="tag.list" ref="tags">
      <template v-for="(item, index) in tag.list" :key="index">
        <li v-if="item">
          <!-- <tag :text="item" :cts="removeTag.bind(index)" /> -->
          <div class="tag">
            <i class="fas fa-tag" />
            <span>
              {{ item }}
            </span>
            <i class="fas fa-times" @click.prevent="removeTag(index)" />
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";

import searchableDropdownList from "../form/searchableDropdownList.vue";

export default defineComponent({
  components: { searchableDropdownList },

  props: {
    tags: {
      type: Array,
      required: false,
      default: () => {
        return [];
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
    const maxlength = 16;

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
      console.log("remove");
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

    return { addTag, removeTag, tag, alerts, booleanTrue, maxlength };
  }
});
</script>
<style lang="less">
@import (reference) "../../less/customVariables.less";
@import (reference) "../../less/customMixins.less";
.inputTags {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  border: 1px solid @secondaryColor;
  border-radius: @borderRadius;
  min-width: 160px;
  max-width: 240px;
  & > ul {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    list-style-type: none;
    flex-wrap: wrap;
    padding: @spaceSm @spaceMd !important;
    & > li {
      font-size: @fontSizeSm;
      padding: 0 @spaceSm !important;
      & > .tag {
        border: 1px solid @secondaryColor;
        border-radius: 4px 16px 16px 4px;
        & > i {
          padding: @spaceMd;
          color: @secondaryColor;
          cursor: pointer;
        }
      }
    }
  }
  & > .searchableDropdownList {
    min-width: 100% !important;
    & > .iconPadding {
      border: none !important;
    }
    input,
    datalist,
    option {
      min-with: 80px;
      max-width: 100% !important;
    }
    & > .inputResponse {
      width: 0px;
      display: none !important;
    }
  }
}
</style>
