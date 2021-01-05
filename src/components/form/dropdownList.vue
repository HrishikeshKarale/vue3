<template>
  <div class="dropdownList" :class="{ inline: inline }">
    <label v-if="label" :class="{ maskField: mask }" :for="name">
      {{ label }}
      <abbr v-if="required" title="Required Field">*</abbr>
      <span v-else> - Optional field<abbr>*</abbr></span>
    </label>
    <div
      :class="{
        warningContainer: alert ? alert.warning : false,
        errorContainer: alert ? alert.error : false,
        iconPadding: icon,
        maskField: mask
      }"
    >
      <span v-if="icon" :class="icon" />
      <select
        v-if="!mask"
        :id="name"
        v-model="dValue"
        :autofocus="autofocus"
        :disabled="disabled"
        :required="required"
        :multiple="multiple"
        :readonly="readonly"
        :size="size"
        @change="validate"
      >
        <!-- <option
                    value= ''
                    :selected= '!d_value'
                    disabled= 'true'
                    :hidden= 'options.indexOf(d_value)!=-1 && required'
                >
                    pick an option
               </option> -->
        <option v-for="(option, index) in options" :key="index" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
    <input-response :error="alert ? alert.error : false" />
  </div>
</template>

<script>
import { defineComponent, ref, onBeforeMount } from "vue";

import validator from "@/typeScript/validator";

import inputResponse from "@/components/alert/inputResponse";

export default defineComponent({
  components: {
    inputResponse
  }, //components

  props: {
    //sets heading/Label for the input field
    label: {
      required: false,
      type: String,
      default: ""
    },

    //sets name attribute for the input field (required field in case of forms)
    name: {
      required: false,
      type: String,
      default: "dropdownInput"
    },

    //users can pass preset values for the input field (v-model)
    value: {
      required: false,
      type: [String, Number, Array],
      default: function(props) {
        if (props.multiple) {
          return [];
        }
        return "";
      }
    },

    //Array of options for user to select .
    options: {
      required: true,
      type: Array
    },

    //no of options  to display at a time.
    size: {
      required: false,
      type: Number,
      default: null
    },

    //sets the multiple attribute for the input field to accept multiple values
    multiple: {
      required: false,
      type: Boolean,
      default: false
    },

    //sets the manual alerts
    alert: {
      required: false,
      type: Object,
      default: () => {
        return {
          error: "",
          warning: ""
        };
      }
    },

    //sets the required attribute for the input field
    required: {
      required: false,
      type: Boolean,
      default: false
    },

    //sets the disabled attribute for the input field
    disabled: {
      required: false,
      type: Boolean,
      default: false
    },

    //sets the autofocus attribute for the input field
    autofocus: {
      required: false,
      type: Boolean,
      default: false
    },

    //sets the autocomplete attribute for the input field
    autocomplete: {
      required: false,
      type: Boolean,
      default: true
    },

    //sets the readonly attribute for the input field
    readonly: {
      required: false,
      type: Boolean,
      default: false
    },

    //checks if label options should appear on the same line or not
    inline: {
      required: false,
      type: Boolean,
      default: false
    },

    //reserves space and created a mask if set to true
    mask: {
      required: false,
      type: Boolean,
      default: false
    },

    //if a valid fontawesome icon class string is passed, it displays it in the input field
    //a valid fontawesome icons class string is a string which starts with fas/far/fab/fa
    icon: {
      required: false,
      type: String,
      default: ""
    }
  }, //props

  setup(props, { emit }) {
    const dValue = ref(props.value);
    const { isRequired } = validator(props, emit, dValue);

    onBeforeMount(() => {
      //if val is a singlevalue, check if it is na acceptable input
      if (
        !props.multiple &&
        (typeof dValue.value == "string" || typeof dValue.value == "number")
      ) {
        //if value is an acceptable input store it in d_value for future manipulation
        if (props.options?.indexOf(dValue.value) != -1) {
          // emit("value", dValue.value);
        }
        //if not trigger alert and set error message
        else {
          emit(
            "notify",
            "warning",
            "Invalid Input: The preset value " +
              dValue.value +
              " is not included in the options for the dropdown."
          );
        }
      }
      //if val is an array check if each value towards acceptable values as input
      else if (props.multiple && Array.isArray(dValue.value)) {
        const tempVal = [];
        const alertVal = [];

        //loop through each value to check for validity of input value
        for (const v in dValue.value) {
          //if value is an acceptable input store it intempVal for future manipulation
          if (props.options?.indexOf(v) != -1) {
            tempVal.push(v);
          }
          //if not save it in a temp errorval variable for further use to trigger alert
          else {
            alertVal.push(v);
          }
        }

        //save acceptable values back to d_value for future manipulation
        // emit("value", tempVal);

        //if errorVal exists trigger an alert and set d_warning message
        if (alertVal) {
          emit(
            "notify",
            "warning",
            "Invalid Input: The preset value(s) " +
              alertVal +
              " is/are not included in the options for the dropdown."
          );
        }
      } else if (dValue.value) {
        emit(
          "notify",
          "warning",
          "Invalid Input: The preset value(s) " +
            dValue.value +
            " are not valid"
        );
      }
    });

    const validate = () => {
      //if value for val(temp) does not exists check if value is required
      //if value is required then trigger alert and set error message
      if (dValue.value) {
        //emit/send new values to parent component v-model attribute
        emit("value", dValue.value);
        emit("notify", "error", "");
      } else {
        if (isRequired()) {
          emit("value", "");
        }
      }
    }; //validate

    return { validate, dValue };
  }
}); //default
</script>

<style lang="less" scoped>
@import (reference) "../../Less/customMixins.less";
.dropdownList {
  min-width: 160px;
  .inputcss();
}
</style>
