<template lang="html">
  <div class="chat">
    <div class="chatMessage">
      <div
        v-for="(chat, index) in state.chats"
        :key="index + ':' + chat"
        :class="[chat.message.from === from ? 'right' : 'left']"
      >
        <span v-if="chatDay(chat.message.timeStamp)">
          {{ chatDay(chat.message.timeStamp) }}
        </span>
        <span>
          <h6 v-if="chat.message.to !== from">
            {{ chat.message.from }}
          </h6>
          {{ chat.message.text }}
          <small>
            {{
              new Date(chat.message.timeStamp).getHours() > 12
                ? new Date(chat.message.timeStamp).getHours() - 12
                : new Date(chat.message.timeStamp).getHours()
            }}:{{ new Date(chat.message.timeStamp).getSeconds()
            }}{{
              new Date(chat.message.timeStamp).getHours() > 12 ? "PM" : "AM"
            }}
          </small>
        </span>
      </div>
    </div>
    <div class="sendMessage">
      <textarea
        v-model="state.message"
        placeholder="message"
        @keydown.enter="sendMessage()"
      />
      <vue-button
        tag="sendMessage"
        text="SEND"
        category="small"
        :ctx="sendMessage.bind(this)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive } from "vue";

// import textInput from "../../components/form/textInput.vue";
import vueButton from "../../components/button/vueButton.vue";

import firebase from "@/typeScript/utilities/firebase";

export default defineComponent({
  components: {
    // textInput,
    vueButton
  }, //components

  props: {
    to: {
      required: false,
      type: String,
      default: ""
    },
    from: {
      required: true,
      type: String
    }
  }, //props

  setup(props) {
    const db = firebase.database();
    const collection = db.ref("chats");
    const state = reactive({
      chats: {},
      message: ""
    });
    let tempDay: number | boolean = false;

    const chatDay = function(timeStamp): string | boolean {
      const day = new Date(timeStamp).getDay();
      const today = new Date(Date.now()).getDay();
      let returnValue: string | boolean = false;

      if (tempDay && tempDay == day) {
        return false;
      } else {
        tempDay = day;
      }
      switch (today - day) {
        case 0:
          returnValue = "Today";
          break;
        case -1:
          returnValue = "Yesteday";
          break;
        default:
          returnValue = (day + new Date(timeStamp).getMonth()).toString();
      }
      return returnValue;
    };

    const sendMessage = function() {
      if (state.message) {
        const newMessage = collection.push();
        newMessage.set({
          message: {
            from: props.from,
            text: state.message,
            timeStamp: Date.now(),
            to: props.to
          }
        });
        state.message = "";
      }
    };

    onBeforeMount(async () => {
      // writeUserData(username, "Hi");
      // const db = firebase.database();
      const data = await collection.once("value");
      state.chats = data.val();

      //event lister whenever a change in data
      collection.on("value", snapshot => {
        state.chats = snapshot.val();
      });
    });

    return { state, sendMessage, chatDay };
  }
});
</script>

<style lang="less">
@import (reference) "../../less/customVariables.less";
@import (reference) "../../less/customMixins.less";

@width: 40px;

.chat {
  display: flex;
  flex-direction: column;
  align-content: center;
  position: relative;
  width: 8 * @width;
  height: 16 * @width;
  padding: 48px 24px 48px 32px;
  // background-size: auto;
  background-repeat: no-repeat;
  & > .chatMessage {
    .scroll(500px);
    padding: 0 8px;
    & > div {
      display: flex;
      flex-direction: column;
      font-weight: bold;
      width: 100%;
      margin-right: 8px;
      & > span {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        width: fit-content;
        background-color: #eee;
        border: 1px solid #ccc;
        padding: @spaceXs @spaceSm;
        margin-bottom: @spaceSm;
        border-radius: @borderRadius;
        & > h6 {
          margin: 0;
          font-weight: 700;
        }
        & > small {
          display: flex;
          align-items: flex-end;
          float: right;
          font-size: 8px;
          margin-left: @spaceMd;
        }
      }
      &.right {
        margin-left: 8px;
        flex-direction: column;
        & > span {
          align-self: flex-end;
          background-color: #eee;
        }
      }
    }
  }
  & > .sendMessage {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    position: absolute;
    bottom: 32px;
    width: fit-content;
    border: 1px solid @primaryColor;
    border-radius: @borderRadius;
    & > textarea {
      align-self: center;
      background-color: @backgroundColor;
      width: 200px;
      height: 32px;
      padding: @spaceLg;
      border: none;
      overflow: auto;
      outline: none;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      resize: none; /*remove the resize handle on the bottom right*/
      &:focus,
      &:focus-within {
        border: none;
        outline: none;
      }
    }
    & > button {
      height: 100%;
    }
  }
}
</style>
