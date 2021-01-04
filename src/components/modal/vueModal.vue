<template>
  <div class="vueModal" v-if="text || showModal">
    <div id="show-modal" v-if="text || icon">
      <vue-button
        tag="toggleModal"
        :text="text"
        :icon="icon"
        :category="category"
        :ctx="toggleModal.bind(this)"
      />
    </div>
    <div v-show="showModal" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div v-if="modalTitle" class="modal-header">
            {{ modalTitle }}
          </div>

          <div class="modal-body">
            <slot>
              default body
            </slot>
          </div>

          <div class="modal-footer">
            <vue-button
              v-if="ctx"
              tag="confirmModal"
              text="CONFIRM"
              icon="fas fa-check"
              category="small"
              :ctx="ctx"
            />
            <vue-button
              class="close"
              tag="closeModal"
              icon="fas fa-times"
              category="icon-sm"
              :ctx="toggleModal.bind(this)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vueButton from "@/components/button/vueButton.vue";

export default {
  name: "VueModal",

  components: {
    vueButton
  }, //data

  props: {
    modalTitle: {
      required: false,
      type: String,
      default: ""
    },

    text: {
      required: false,
      type: String,
      default: ""
    },

    category: {
      required: false,
      type: String,
      default: "small"
    },

    tag: {
      required: false,
      type: String,
      default: ""
    },

    icon: {
      required: false,
      type: String,
      default: ""
    },

    showModal: {
      required: false,
      type: Boolean,
      default: false
    },

    ctx: {
      required: false,
      type: Function,
      default: null
    }
  }, //props

  mounted() {
    document.addEventListener("click", this.clickHandler, {
      capture: false, // top to bottom bubbling/propogation
      once: false //should work only once
    });
    // console.log(this.$router.currentRoute.value.meta.requiresAuth);
  },

  methods: {
    toggleModal: function() {
      return this.$emit("showModal", !this.showModal);
    },

    clickHandler: function(event) {
      if (!event.target.closest(".modal-container") && this.showModal) {
        this.toggleModal();
      }
    } //clickHandler
  }
};
</script>

<style lang="less" scoped>
@import (reference) "../../Less/customMixins.less";
@import (reference) "../../Less/customVariables.less";

.vueModal {
  display: inline-flex;

  .modal-mask {
    position: fixed;
    z-index: @modalZ;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    outline: 9999px solid rgba(0, 0, 0, 0.5);
    display: table;
    transition: @transition;

    .modal-wrapper {
      display: table-cell;
      vertical-align: middle;

      .modal-container {
        min-width: 320px;
        max-width: max-content;
        height: max-content;
        margin: 0px auto;
        padding: 8px 16px;
        background-color: @backgroundColor;
        border-radius: @borderRadius;
        .boxShadow(@two);
        transition: @transition;
        font-family: Helvetica, Arial, sans-serif;
        position: relative;

        .close {
          position: absolute;
          top: 8px;
          right: 8px;
        }

        .modal-header {
          color: @backgroundColor;
          background-color: #003a65;
          border-top-left-radius: @borderRadius;
          border-top-right-radius: @borderRadius;
          padding: @spaceMd @spaceLg;
          font-size: 2 * @fontSize;
          height: auto;
          text-align: left;
        }

        .modal-body {
          padding: @spaceMd @spaceLg;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        }

        .modal-footer {
          padding: @spaceMd @spaceLg;
          display: flex;
          flex-direction: row-reverse;
          flex-wrap: nowrap;
        }
      }
    }
  }
}

/*
    * The following styles are auto-applied to elements with
    * transition= "modal" when their visibility is toggled
    * by Vue.js.
    *
    * You can easily play with the modal transition by editing
    * these styles.
    */

.modal-enter,
.modal-leave-active {
  .opacity(0);
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
