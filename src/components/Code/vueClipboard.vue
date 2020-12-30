<template>
  <div class="copyClipboard">
    <vue-button
      :tag="tag"
      :text="text"
      :icon="icon"
      :category="text ? 'small' : 'icon'"
      :ctx="copyToClipboard.bind(this)"
    />
    <textarea :id="id" :value="copy"></textarea>
  </div>
</template>
<script>
import vueButton from "@/components/vueButton";

export default {
  name: "vueClipboard",

  props: {
    text: {
      required: false,
      type: String,
      default: null
    },

    tag: {
      required: false,
      type: String,
      default: "copyToClipboard"
    },

    icon: {
      required: false,
      type: String,
      default: "fas fa-copy"
    },

    copy: {
      required: true
    },

    id: {
      required: true,
      type: String,
      default: () => {
        alert("vueClipboard: id is a required field");
      }
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
        // alert("copied: ", successful);
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
