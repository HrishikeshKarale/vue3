//https://markus.oberlehner.net/blog/replicating-the-twitter-tweet-box-with-vue/
<template>
  <div class="vueInput">
    <div :class="{ inline: inline }">
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
          :type="dType"
          :name="name"
          :placeholder="placeholder"
          :maxlength="maxlength"
          :pattern="pattern"
          :autofocus="autofocus"
          :disabled="disabled"
          :readonly="readonly"
          :required="required"
          :autocomplete="autocomplete"
          @input="validate"
          @blur="followsPattern"
        />
        <span
          v-if="type === 'passowrd'"
          :class="['fas', dType != 'text' ? 'fa-eye' : 'fa-eye-slash']"
          @click="peek(1)"
        />
        <div v-if="$slots['isValid'] && dValue" class="conditions">
          <slot name="isValid" />
        </div>
        <!-- <div v-if="dValue" class="conditions">
          <div>
            <span
              :class="
                dValue.match(/(?=.*[A-Z])(?=.*[0-9])/g)
                  ? 'fas fa-check'
                  : 'fas fa-times'
              "
            />
            Numbers present
          </div>
          <div>
            <span
              :class="dValue.match(/\S{1,}/g) ? 'fas fa-check' : 'fas fa-times'"
            />
            No Spaces
          </div>
          <div>
            <span
              :class="
                dValue.match(/(?=.*[A-Z])/g) ? 'fas fa-check' : 'fas fa-times'
              "
            />
            Capital Letter
          </div>
          <div>
            <span
              :class="
                dValue.match(/(?=.*[a-z])/g) ? 'fas fa-check' : 'fas fa-times'
              "
            />
            Snall letters
          </div>
          <div>
            <span
              :class="dValue.length > 7 ? 'fas fa-check' : 'fas fa-times'"
            />
            More than 8 characters
          </div>
          <div>
            <span
              :class="
                dValue.match(/(?=.*[!@#\\$%\\^&\\*])/g)
                  ? 'fas fa-check'
                  : 'fas fa-times'
              "
            />
            Special character
          </div>
        </div> -->
      </div>
      <input-response
        :warning="alert ? alert.warning : false"
        :error="alert ? alert.error : ''"
        :info="alert ? alert.info : dValue ? maxlength - dValue.length < 0 : ''"
        :success="alert ? alert.success : ''"
      />
    </div>
    <div v-if="valueMatch && type === 'passowrd'" :class="{ inline: inline }">
      <label v-if="label" :class="{ maskField: mask }">
        Confirm {{ label }}
        <abbr v-if="required" title="Required Field">*</abbr>
        <span v-else> - Optional field<abbr>*</abbr></span>
      </label>
      <div
        :class="{
          warningContainer: dValue
            ? valueMatch
              ? dValue === valueMatch
                ? null
                : 'Passwords does not match'
              : null
            : null,
          errorContainer: dValue
            ? valueMatch
              ? null
              : 'Required Field'
            : null,
          iconPadding: icon,
          maskField: mask
        }"
      >
        <span v-if="icon" :class="icon" />
        <input
          v-if="!mask"
          v-model="valueMatch"
          :type="dTypeMatch"
          :name="name + 'Match'"
          :placeholder="placeholder"
          :maxlength="maxlength"
          :autofocus="autofocus"
          :disabled="disabled"
          :readonly="readonly"
          :autocomplete="autocomplete"
          v-on:keyup[0]="validate"
          v-on:keyup[1]="validate"
          @input="validate"
        />
        <span
          v-if="type === 'password'"
          :class="['fas', dTypeMatch != 'text' ? 'fa-eye' : 'fa-eye-slash']"
          @click="peek(0)"
        />
        <div v-if="$slots['isValidMatch'] && dValue" class="conditions">
          <slot name="isValidMatch" />
        </div>
        <!-- <div v-if="dValue" class="conditions">
          <div>
            <span
              :class="
                dValue && dValue === valueMatch
                  ? 'fas fa-check'
                  : 'fas fa-times'
              "
            />
            {{ label }} Match
          </div>
        </div> -->
      </div>
      <input-response
        :warning="
          dValue
            ? valueMatch
              ? dValue === valueMatch
                ? null
                : 'Passwords does not match'
              : null
            : null
        "
        :error="dValue ? (valueMatch ? null : 'Required Field') : null"
        :info="alert ? alert.info : dValue ? maxlength - dValue.length < 0 : ''"
        :success="alert ? alert.success : dValue && dValue === valueMatch"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from "vue";

import validator from "@/typeScript/validator";

import inputResponse from "@/components/alert/inputResponse.vue";

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

    //sets type attribute for the input field.
    type: {
      required: true,
      type: String,
      validator: function(value) {
        return (
          [
            "text",
            "password",
            "email",
            "number",
            "month",
            "image",
            "range",
            "week",
            "url",
            "tel",
            "time",
            "search",
            "datetime-local",
            "file",
            "hidden"
          ].indexOf(value) !== -1
        );
      }
    },

    //sets name attribute for the input field (required field in case of forms)
    name: {
      required: false,
      type: String,
      default: "vueInput"
    },

    //users can pass preset values for the input field
    value: {
      required: false,
      type: String,
      default: ""
    },

    //sets the format/pattern for acceptable values for the input field
    pattern: {
      required: false,
      type: [RegExp, String, null],
      default: () =>
        // eslint-disable-next-line vue/require-valid-default-prop
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/
    },

    //sets the placeholder attribute for the input field
    placeholder: {
      required: false,
      type: String,
      default: "Enter passsword here..."
    },

    //sets the maxlength attribute for the input field
    maxlength: {
      required: false,
      type: [Number, null],
      default: 50
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

    //if a valid fontawesome icon class string is passed, it displays it in the input field
    //a valid fontawesome icons class string is a string which starts with fas/far/fab/fa
    icon: {
      required: false,
      type: String,
      default: ""
    },

    //if true, the component generates a confirmation password box in order to check the password matches the original box password
    match: {
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

    //uses the values to trigger validation by using v-on attribute
    keyup: {
      type: Array,
      required: false,
      default: () => ["keyup.tab", "keyup.enter"]
    }
  }, //props

  setup(props, { emit }) {
    const dValue = ref("");
    //type defaulted to password.
    const dType = ref(props.type);
    const alertObject = reactive({
      warning: props.alert ? props.alert.warning : "",
      error: props.alert ? props.alert.error : ""
    });

    const { validate, followsPattern } = validator(props, emit, dValue);

    //stores textbox password values to match with dValue
    const valueMatch = props.type === "password" ? ref("") : null;
    //type defaulted to password.
    const dTypeMatch = props.type === "password" ? ref("password") : null;
    //peek into thepassword value
    const peek =
      props.type === "password"
        ? val => {
            if (val === 0) {
              dTypeMatch.value =
                dTypeMatch.value === "password" ? "text" : "password";
            } else if (val === 1) {
              dType.value = dType.value === "password" ? "text" : "password";
            }
          }
        : val => {
            /*do nothing*/
          };

    return {
      alertObject,
      dValue,
      valueMatch,
      dType,
      dTypeMatch,
      peek,
      validate,
      followsPattern
    };
  }
}); //default
</script>

<style lang="less" scoped>
@import (reference) "../../Less/customMixins.less";
.vueInput {
  width: fit-content;
  & > div {
    .inputcss();
  }
}
</style>
