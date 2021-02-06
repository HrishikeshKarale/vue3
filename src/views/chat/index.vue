<template lang="html">
  <div class="chat">
    <div class="phone">
      <chat
        v-if="username"
        to="id2"
        :from="username"
        :collection="collection"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

import chat from "./chat.vue";

import firebase from "@/typeScript/utilities/firebase";

export default defineComponent({
  components: {
    chat
  }, //components
  setup() {
    const db = firebase.database();
    const collection = db.ref("chats");

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const username = computed(() => {
      const user = localStorage.getItem("user");
      const data = user ? JSON.parse(user) : "";
      console.log(data.email.substr(0, data.email.indexOf("@")));
      return data.email.substr(0, data.email.indexOf("@"));
    });

    return { username, collection };
  }
});
</script>

<style lang="less">
@import (reference) "../../less/customVariables.less";
@import (reference) "../../less/customMixins.less";

@width: 40px;

.chat {
  display: flex;

  & > .phone {
    width: fit-content;
    height: fit-content;
    background-image: url("../../assets/phone.svg");
    background-size: auto;
    background-repeat: no-repeat;
  }
}
</style>
