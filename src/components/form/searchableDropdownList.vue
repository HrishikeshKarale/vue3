<template>
  <div class="searchableDropdownList" :class="{ inline: inline }">
    <label v-if="label" :class="{ maskField: mask }">
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
      <input
        v-if="!mask"
        v-model="dValue"
        :name="tag"
        :list="tag"
        :placeholder="placeholder"
        :multiple="multiple"
        :required="required"
        :disabled="disabled"
        :autofocus="autofocus"
        :maxlength="maxlength"
        v-on:keyup[0]="validate"
        v-on:keyup[1]="validate"
        @change="validate"
      />
      <datalist :id="tag">
        <option v-for="(option, index) in options" :key="index" :value="option">
          {{ option }}
        </option>
      </datalist>
    </div>
    <input-response
      :warning="alert ? alert.warning : false"
      :error="alert ? alert.error : ''"
      :info="alert ? alert.info : dValue ? maxlength - dValue.length < 0 : ''"
      :success="alert ? alert.success : ''"
    />
  </div>
</template>

<script>
import { defineComponent, ref, onBeforeMount } from "vue";

import validator from "@/typeScript/validator";

import inputResponse from "@/components/alert/inputResponse";

export default defineComponent({
  components: {
    inputResponse
  }, //data

  props: {
    //sets heading/Label for the input field
    label: {
      required: false,
      type: String,
      default: ""
    },

    //sets name attribute for the input field (required field in case of forms)
    tag: {
      required: false,
      type: String,
      default: "dropdownInput"
    },

    //users can pass preset values for the input field
    value: {
      required: false,
      type: function(props) {
        let temp = null;
        switch (typeof props.options[0]) {
          case "object":
            break;
          case "number":
            temp = Number;
            break;
          case "string":
            temp = String;
            break;
        }
        if (props.multiple) {
          temp = [temp, Array];
        }
        return temp;
      },
      default: function(props) {
        if (props.multiple) {
          return [];
        }
        return null;
      }
    },

    //looks for exact match
    //if set true wors like a dropdown list while if toggles between
    strict: {
      required: false,
      type: Boolean,
      default: true
    },

    //Array of options for user to select .
    options: {
      required: true,
      type: Array
    },

    //sets the format/pattern for acceptable values for the input field
    pattern: {
      required: false,
      type: [RegExp, String],
      default: new RegExp(/([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*/)
    },

    //sets the placeholder attribute for the input field
    placeholder: {
      required: false,
      type: String,
      default: function(props) {
        if (props.strict) {
          return "Select an option...";
        }
        return "Enter value or Select an option...";
      }
    },

    //sets the maxlength attribute for the input field
    maxlength: {
      required: false,
      type: Number,
      default: 50
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

    //checks if label options should appear on the same line or not
    inline: {
      required: false,
      type: Boolean,
      default: false
    },

    //reserves space and creates a mask if set to true
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
    },

    //uses the values to trigger validation by using v-on attribute
    keyup: {
      type: Array,
      required: false,
      default: () => ["keyup.tab", "keyup.enter"]
    }
  }, //props

  setup(props, { emit }) {
    const dValue = ref(props.value);
    const { isStrict, isRequired } = validator(props, emit, dValue);

    //validate the textbox input and set alert messages if required.
    //it also emits/send the current textbox value to  parent component as v-model attribute value
    const validate = () => {
      //loads current value stored from dValue(data) into val(temp) variable val for readability of code
      const val = dValue.value;

      //if value for val(temp) exists check for dWarning triggers
      if (val) {
        //if an acceptable value exists,emit/send new values to parent component v-model attribute
        //if not then trigger dWarning and set dWarning message
        if (props.options.includes(val) || !props.strict) {
          emit("value", val);
          emit("notify", "error", "");
        }
        //if options do not include the optio na dn user customized input is not acceptable then trigger alert and set dWarning message
        else if (isStrict()) {
          //automatically notifies the parent component/host about the error
        }
      }
      //if a value for val(temp) does not exists  and is required, thentrigger error and set error message
      else if (isRequired()) {
        emit("value", "");
      }
    }; //validate

    onBeforeMount(() => {
      //store value of prop in temp variable for code readability
      const val = props.value;
      const options = props.options;
      const strict = props.strict;
      const multiple = props.multiple;

      //if val is a singlevalue, check if it is na acceptable input
      if (!multiple && (typeof val == "string" || typeof val == "number")) {
        //if value is an acceptable input store it in dValue for future manipulation
        if ((options && options.includes(val)) || !strict) {
          dValue.value = val;
        }
        //if not trigger alert and set error message
        else if (isStrict()) {
          //automatically notifies the parent component/host about the error
        }
      }
      //if val is an array check if each value towards acceptable values as input
      else if (multiple && Array.isArray(val)) {
        const tempVal = [];
        const alertVal = [];

        //loop through each value to check for validity of input value
        for (const v in val) {
          //if value is an acceptable input store sit intempVal for future manipulation
          if ((options && options.includes(v)) || !props.strict) {
            tempVal.push(v);
          }
          //if not save it in a temp errorval variable for further use to trigger alert
          else if (isStrict()) {
            alertVal.push(v);
          }
        }

        //save acceptable values back to dValue for future manipulation
        dValue.value = tempVal;

        //if errorVal exists trigger an alert and set dWarning message
        if (alertVal) {
          emit(
            "notify",
            "warning",
            "Invalid Input: The preset value(s) " +
              alertVal +
              " is/are not included in the options for the dropdown."
          );
        }
      } else if (val) {
        emit(
          "notify",
          "warning",
          "Invalid Input: The preset value(s) " + val + " are not valid"
        );
      }
    });

    return { dValue, validate };
  }
}); //default
</script>

<style lang="less" scoped>
@import (reference) "../../less/customMixins.less";

.searchableDropdownList {
  .inputcss();
}
</style>
