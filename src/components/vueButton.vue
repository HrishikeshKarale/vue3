<template>
  <button
    :class="[
      'vueButton',
      ['fullWidth', 'border-fwidth'].includes(style) ? 'fullWidth' : null,
      this.buttonClass
    ]"
    :type="type"
    :name="name"
    :autofocus="autofocus"
    :disabled="disabled"
    :form="form"
    @click.stop.prevent="ctx"
  >
    <span v-if="icon" :class="icon" />
    <template v-if="!['icon', 'icon-sm', 'icon-lg'].includes(style)">
      {{ text.toUpperCase() }}
    </template>
  </button>
</template>

<script>
export default {
  name: "VueButton",

  data() {
    const buttonClass = () => {
      let tempClass = "btn";
      switch (this.style) {
        case "standard":
          tempClass += " btn-primary";
          break;
        case "icon":
          tempClass += " btn-icon";
          break;
        case "icon-sm":
          tempClass += " btn-icon btn-sm";
          break;
        case "icon-lg":
          tempClass += " btn-icon btn-lg";
          break;
        case "text":
          tempClass += " btn-link btn-text";
          break;
        case "text-sm":
          tempClass += " btn-text btn-sm";
          break;
        case "text-lg":
          tempClass += " btn-text btn-lg";
          break;
        case "small":
          tempClass += " btn-primary btn-sm";
          break;
        case "large":
          tempClass += " btn-primary btn-lg";
          break;
        case "fullWidth":
          tempClass += " btn-fullWidth btn-block";
          break;
        case "border":
          tempClass += " btn-border";
          break;
        case "border-sm":
          tempClass += " btn-border btn-sm";
          break;
        case "border-lg":
          tempClass += " btn-border btn-lg";
          break;
        case "border-fwidth":
          tempClass += " btn-border btn-fullWidth btn-block";
          break;
        default:
          tempClass += "";
      }
      return tempClass;
    };
    return {
      buttonClass
    };
  }, //data

  props: {
    type: {
      type: [String, null],
      required: false,
      default: "button",
      validator: function(value) {
        return ["button", "submit", "reset"].indexOf(value) !== -1;
      }
    },

    name: {
      type: [String, null],
      required: false,
      default: null
    },

    icon: {
      type: [String, null],
      required: function(props) {
        return ["icon", "icon-lg", "icon-sm"].indexOf(props.style) !== -1;
      },
      default: null
    },

    text: {
      type: [String, null],
      required: false,
      default: null
    },

    style: {
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
        if (props.name) {
          return props.name;
        }
        return "form";
      }
    },

    ctx: {
      type: [Function, null],
      required: function(props) {
        // console.log(props.type);
        if (props.type === "button") {
          return true;
        }
        return false;
      },
      default: function() {
        alert(
          "button undefined: Please send a function to execute when the button is clicked"
        );
      }
    }
  } //props
}; //default
</script>

<style lang="less" scoped>
@import (reference) "../Less/customVariables.less";
@import (reference) "../Less/customMixins.less";

@color: @secondaryColor; // #1B746D;

.vueButton {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  width: fit-content;

  & > span {
    margin-right: @spaceMd;
  }

  &.btn-sm {
    padding: @spaceSm @spaceMd;
    font-size: @fontSizeSm;
  }

  &.btn-lg {
    padding: @spaceMd @spaceLg;
    font-size: @fontSizeSm * 2;
  }

  .boxShadow(@three);

  &:hover {
    .boxShadow(@one);
  }
  //icon buttons
  &.btn-icon {
    background-color: transparent;
    color: @color;
    padding: @spaceSm;
    font-size: @fontSize;

    & > span {
      margin-right: 0;
    }

    .textShadow(@one);

    &:hover {
      .textShadow(@base);
    }
  }

  //text links or  text as buttons
  &.btn-text {
    background-color: transparent;
    color: @color;
    padding: @spaceSm @spaceMd;
    font-weight: bold;

    &:hover {
      border: 1px solid @color;
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
}
</style>
