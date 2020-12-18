<template>
  <div>
    <h3><i class="fas fa-tag"></i>{{ msg }}</h3>
    <input-tags @input="tag" />
  </div>
</template>

<script lang="ts">
import inputTags from "./inputTags/inputTags.vue";

export default {
  components: { inputTags },

  data() {
    const list = [""];
    const value = "";
    const dWarning = null;
    const dDanger = null;
    const booleanTrue = true;
    return {
      list,
      value,
      dWarning,
      dDanger,
      booleanTrue
    };
  }, //data
  methods: {
    tag: function(val: string) {
      if (typeof val !== "object") {
        this.list = [val, ...this.list];
      }
    }, //tag
    alerts: function(type, message) {
      if (type == "warning") {
        this.dWarning = message;
      } else if (type == "error") {
        this.dDanger = message;
      } else {
        alert("error in input alert module");
      }
    }
  }, //methods

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
