<template>
  <div>
    <h3>
      {{ msg }}
    </h3>
    <!-- <vue-input
      type="tel"
      :value="text"
      label="Text"
      name="usernameTextField"
      placeholder="*************"
      :required="booleanTrue"
      icon="far fa-user"
      :autocomplete="booleanTrue"
      @value="val => (text = val)"
    />
    {{ text }} -->
  </div>
</template>

<script lang="ts">
// import vueInput from "./form/vueInput.vue";

export default {
  // data() {
  //   return {
  //     text: "",
  //     booleanTrue: true
  //   };
  // },
  // components: { vueInput },
  props: {
    msg: String
  }
};
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
