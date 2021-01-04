<template>
  <div class="tag">
    <i class="fas fa-tag" />
    <span>
      {{ text }}
    </span>
    <i class="fas fa-times" @click.stop.prevent="ctx" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    text: {
      type: String,
      required: true
    },
    ctx: {
      type: Function,
      required: false
    }
  }
});
</script>
<style lang="less">
@import (reference) "../../../less/customVariables.less";
@import (reference) "../../../less/customMixins.less";
.tag {
  border: 1px solid @secondaryColor;
  border-radius: 4px 16px 16px 4px;
  & > i {
    padding: @spaceMd;
    color: @secondaryColor;
    cursor: pointer;
  }
}
</style>
