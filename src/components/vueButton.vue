<template>
  <button
    :class="[
      'vueButton',
      ['fullWidth', 'border-fwidth'].includes(category) ? 'fullWidth' : null,
      buttonClass
    ]"
    :type="type"
    :name="tag"
    :autofocus="autofocus"
    :disabled="disabled"
    :form="form"
    @click.stop.prevent="ctx"
  >
    <span v-if="icon" :class="icon" />
    <template v-if="!['icon', 'icon-sm', 'icon-lg'].includes(category)">
      {{ text }}
    </template>
  </button>
</template>

<script>
export default {
  name: "vueButton",

  data() {
    const buttonClass = "";
    return {
      buttonClass
    };
  }, //data

  beforeMount() {
    switch (this.category) {
      case "standard":
        this.buttonClass += "btn-primary";
        break;
      case "icon":
        this.buttonClass += "btn-icon";
        break;
      case "icon-sm":
        this.buttonClass += "btn-icon btn-sm";
        break;
      case "icon-lg":
        this.buttonClass += "btn-icon btn-lg";
        break;
      case "text":
        this.buttonClass += "btn-link btn-text";
        break;
      case "text-sm":
        this.buttonClass += "btn-text btn-sm";
        break;
      case "text-lg":
        this.buttonClass += "btn-text btn-lg";
        break;
      case "small":
        this.buttonClass += "btn-sm";
        break;
      case "large":
        this.buttonClass += "btn-lg";
        break;
      case "fullWidth":
        this.buttonClass += "btn-fullWidth btn-block";
        break;
      case "border":
        this.buttonClass += "btn-border";
        break;
      case "border-sm":
        this.buttonClass += "btn-border btn-sm";
        break;
      case "border-lg":
        this.buttonClass += "btn-border btn-lg";
        break;
      case "border-fwidth":
        this.buttonClass += "btn-border btn-fullWidth btn-block";
        break;
      default:
        this.buttonClass += "";
    }
  }, //beforeMount

  props: {
    type: {
      type: [String, null],
      required: false,
      default: "button",
      validator: function(value) {
        return ["button", "submit", "reset"].indexOf(value) !== -1;
      }
    },

    tag: {
      type: [String, null],
      required: false,
      default: null
    },

    icon: {
      type: [String, null],
      required: function(props) {
        return ["icon", "icon-lg", "icon-sm"].indexOf(props.category) !== -1;
      },
      default: null
    },

    text: {
      type: [String, null],
      required: false,
      default: null
    },

    category: {
      type: [String, null],
      required: false,
      default: "standard",
      validator: function(value) {
        return (
          [
            "standard",
            "large",
            "small",
            "fullWidth",
            "border",
            "border-sm",
            "border-lg",
            "border-fwidth",
            "text",
            "text-sm",
            "text-lg",
            "icon",
            "icon-sm",
            "icon-lg",
            null
          ].indexOf(value) !== -1
        );
      }
    },

    disabled: {
      type: [Boolean, null],
      required: false,
      default: false
    },

    autofocus: {
      type: [Boolean, null],
      required: false,
      default: false
    },

    //sets the autocomplete attribute for the input field
    autocomplete: {
      type: [Boolean, null],
      required: false,
      default: true
    },

    form: {
      type: [String, null],
      required: false,
      default: function(props) {
        if (props.tag) {
          return props.tag;
        }
        return "form";
      }
    },

    ctx: {
      type: [Function, null],
      required: function(props) {
        // console.log(props.type);
        if (props.type != "button") {
          return false;
        }
        return true;
      },
      default: function(props) {
        if (props.type != "button") {
          return null;
        } else {
          alert(
            "button undefined: Please send a function to execute when the button is clicked"
          );
        }
      }
    }
  } //props
}; //default
</script>

<style lang="less" scoped>
@import (reference) "../less/customVariables.less";
@import (reference) "../less/customMixins.less";

@color: @secondaryColor;

.vueButton {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  width: fit-content;
  background-color: @color;
  color: @textColor;
  border: 1px solid @color;
  height: fit-content;

  & > span {
    margin-right: @spaceMd;
  }

  .boxShadow(@one);

  &:not([disabled]):hover {
    .boxShadow(@base);
  }
  //icon buttons
  &.btn-icon {
    background-color: transparent;
    color: @color;
    padding: @spaceSm;
    font-size: @fontSize;
    border-color: transparent;

    & > span {
      margin-right: 0;
    }

    .textShadow(@baseText);

    &:hover {
      .textShadow(@oneText);
    }
  }

  //text links or  text as buttons
  &.btn-text {
    background-color: transparent;
    color: @color;
    padding: @spaceSm @spaceMd;
    font-weight: bold;

    &:not([disabled]):hover {
      border-color: transparent;
    }
  }

  //buttons with a border outline and transparent background
  &.btn-border {
    border-radius: @borderRadius;
    background-color: transparent;
    border: 1px solid @color;
    color: @color;
    font-weight: bold;
  }

  &.fullWidth,
  .btn-fullWidth {
    width: 100%;
  }

  &.btn-sm {
    padding: @spaceSm @spaceMd;
    font-size: @fontSizeSm;
  }

  &.btn-lg {
    padding: @spaceMd @spaceLg;
    font-size: @fontSizeSm * 2;
  }
}
</style>
