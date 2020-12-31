<template>
  <div class="home">
    <vue-img alt="Vue logo" :src="logo" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue";
import vueImg from "@/components/image/vueImg.vue";

@Options({
  components: {
    HelloWorld,
    vueImg
  }
})
export default class Home extends Vue {
  data() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const logo = require("@/assets/logo.svg");
    return {
      logo
    };
  }
}
</script>

<style lang="less">
img {
  height: 480px;
}
</style>
