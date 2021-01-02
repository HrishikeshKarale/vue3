<template>
  <div class="home">
    <vue-img alt="Vue logo" :src="logo" />
    <HelloWorld msg="Welcome to My Vue3 Practice App portal" />
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

<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: auto;
  & > img {
    height: 240px;
  }
}
</style>
