<template>
  <div>
    <h3><i class="fas fa-tag"></i>{{ msg }}</h3>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
</style>
