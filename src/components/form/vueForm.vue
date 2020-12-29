<template>
  <form
    :id="tag"
    class="vueForm"
    :name="tag"
    :novalidate="!validate"
    :autocomplete="autocomplete"
    @submit="ctx"
  >
    <div class="description">
      <slot name="formDescription" />
    </div>
    <div class="elements">
      <slot name="formElements" />
    </div>
    <div class="buttons">
      <vue-button
        type="submit"
        tag="submitButton"
        text="Submit"
        category="small"
        icon="fas fa-clipboard-check"
        :disabled="!validInput"
        :ctx="ctx"
      />
      <input class="btn" type="reset" value="Reset" />
    </div>
  </form>
</template>
<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";

import vueButton from "../vueButton.vue";

export default defineComponent({
  components: {
    vueButton
  }, //components

  props: {
    alert: {
      required: true,
      type: Object
    },
    ctx: {
      required: true,
      type: Function
    },
    tag: {
      required: false,
      type: String,
      default: ""
    },
    autocomplete: {
      required: false,
      type: Boolean,
      default: true
    },
    validate: {
      required: false,
      type: Boolean,
      default: false
    }
  }, //props

  setup(props) {
    let formElement = document.getElementById(props.tag);
    onMounted(() => {
      formElement = document.getElementById(props.tag);
    });

    //returns true if inputs entered are valid or validate flag set to false
    const validInput = computed(function() {
      if (!props.validate) return true;
      if (formElement && !props.alert["error"] && !props.alert["warning"]) {
        const inputs = [
          ...Array.from(formElement.getElementsByTagName("select")),
          ...Array.from(formElement.getElementsByTagName("input"))
        ];

        for (let index = 0; index < inputs.length; ++index) {
          if (inputs[index].required && !inputs[index].value) {
            return false;
          }
          //skipPAsswordMatch value check
          if (inputs[index].type === "password") {
            index++;
          }
        }
        return true;
      }
      return false;
    });

    return { validInput };
  }
}); //default
</script>
<style lang="less" scoped>
@import (reference) "../../less/customMixins.less";
@import (reference) "../../less/customVariables.less";

.vueForm {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  & > div {
    display: flex;
    &.description {
      flex-direction: column;
    }
    &.elements {
      flex-direction: column;
      align-self: center;
    }
    &.buttons {
      flex-direction: row-reverse;
      & > input {
        font-size: @fontSizeMd;
        margin-right: @spaceMd;
        &:first-child {
          margin-right: 0;
        }
        &[type="reset"] {
          background-color: transparent;
        }
      }
    }
  }
}
</style>
