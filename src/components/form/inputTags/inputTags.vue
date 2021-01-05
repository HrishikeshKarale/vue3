//https://stackoverflow.com/questions/10839570/how-does-stackoverflow-make-its-tag-input-field
//https://zapier.com/blog/best-todo-list-apps/
<template>
  <ul class="inputTags" ref="tagElement">
    <li>
      <searchable-dropdown-list
        label="Enter Tag info"
        tag="tagGenerator"
        :options="tags"
        :strict="!booleanTrue"
        :alert="alertObject"
        placeholder="Enter tags..."
        icon="fas fa-tags"
        @value="addTag"
        @notify="notify"
      />
    </li>
    <template v-if="tags">
      <li v-for="item in tags" :key="item" :data-item="item">
        <span class="fas fa-tag" />
        {{ item }}
        <span class="fas fa-times" @click="removeTag(item)" />
      </li>
    </template>
  </ul>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

import notify from "@/typeScript/notify";

import searchableDropdownList from "@/components/form/searchableDropdownList.vue";

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
    const tag = ref("");
    const tagElement = ref(null);
    const booleanTrue = true;

    const { alertObject } = notify();

    const addTag = (val: string) => {
      if (!props.tags.includes(val)) {
        emit("value", [...props.tags, val]);
      } else {
        const element = tagElement.value;
        const li = element
          ? Array.from(document.querySelectorAll(`[data-item=${val}]`))[0]
          : null;
        if (li) {
          const timer = setInterval(() => {
            li.classList.toggle("marked");
          }, 200);
          setTimeout(() => clearInterval(timer), 1200);
        }
      }
      tag.value = "";
    };

    const removeTag = (val: string) => {
      console.log(
        val,
        props.tags.filter(a => a != val)
      );
      emit(
        "value",
        props.tags.filter(a => a != val)
      );
    };

    return {
      addTag,
      removeTag,
      tag,
      tagElement,
      alertObject,
      notify,
      booleanTrue
    };
  }
});
</script>
<style lang="less">
@import (reference) "../../../less/customVariables.less";
@import (reference) "../../../less/customMixins.less";
ul.inputTags {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  list-style-type: none;
  flex-wrap: wrap;
  height: fit-content;
  max-width: 320px;
  & > li {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    border: 1px solid @secondaryColor;
    padding: @spaceSm 0 @spaceSm 0;
    margin: @spaceSm;
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
    border-radius: 4px;
    &:not(:first-child) {
      font-size: @fontSizeSm;
    }
    &:hover {
      & > span:last-child {
        visibility: visible;
      }
    }
    &.marked {
      background-color: @secondaryColor;
      color: @backgroundColor;
      font-weight: bold;
    }
    & > span {
      align-self: center;
      padding: @spaceSm;
      margin-left: @spaceSm;
      color: @secondaryColor;
      &:last-child {
        visibility: hidden;
      }
    }
    &:first-child {
      padding: 0;
      border: none;
      & > .searchableDropdownList {
        & > .inputResponse {
          // display: none !important;
        }
      }
    }
  }
}
</style>
