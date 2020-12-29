<template>
  <div class="copyClipboard">
    <div>
      <vue-button
        :type="type"
        :tag="name"
        :text="text"
        :icon="icon"
        :category="text ? 'small' : 'icon'"
        :disabled="!booleanTrue"
        :autofocus="!booleanTrue"
        :form="form"
        :ctx="copyToClipboard"
      />
    </div>
    <div>
      <textarea :id="id" :value="componentCode"></textarea>
    </div>
  </div>
</template>
<script>
import vueButton from "@/components/vueButton";

export default {
  name: "vueClipboard",

  data() {
    const type = "button";
    const booleanTrue = true;
    const form = "";
    const ctx = this.consoleClick;
    return {
      type,
      booleanTrue,
      form,
      ctx
    }; //return
  }, //data

  props: {
    text: {
      required: false,
      type: String,
      default: null
    },

    name: {
      required: false,
      type: String,
      default: "copyToClipboard"
    },

    icon: {
      required: false,
      type: String,
      default: "fas fa-copy"
    },

    componentCode: {
      required: true
    },

    id: {
      required: true,
      type: String
    }
  }, //props

  components: {
    vueButton
  }, //components

  methods: {
    copyToClipboard: function() {
      const tempId = "#" + this.id;
      const codeToCopy = document.querySelector(tempId);
      codeToCopy.style.display = "block";
      codeToCopy.select();

      try {
        document.execCommand("copy");
        // const successful = document.execCommand("copy");
        // const msg = successful ? "successful" : "unsuccessful";
        // alert("code copied!");
        // console.log('copy successfull', tempId)
        // alert("copied: ", successful)
      } catch (err) {
        alert("Oops, unable to copy");
      }

      document.querySelector(tempId).style.display = "none";
      window.getSelection().removeAllRanges();
    } //copyToClipboard
  } //methods
}; //default
</script>

<style lang="less" scoped>
.copyClipboard {
  display: flex;

  textarea {
    display: none;
  }
}
</style>
