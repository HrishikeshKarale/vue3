<template>
  <div>
    <h3>
      {{ msg }}
    </h3>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    msg: String
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
div {
  display: flex;
  flex-direction: column;
  margin: auto;
  swidth: fit-content;
  & > h3 {
    width: fit-content;
  }
}
</style>
