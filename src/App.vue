<template>
  <div>
    <header>
      <nav>
        <router-link to="/">Home</router-link>
        | <router-link to="/toDoApp">To Do app</router-link> |
        <router-link to="/calendar">Calendar</router-link> |
        <router-link to="/markdown">Markdown</router-link> |
        <router-link to="/slider">Slider Carousel</router-link>
      </nav>
      <vue-modal
        :showModal="showModal"
        text="Login"
        icon="fas fa-sign-in-alt"
        @showModal="val => (showModal = val)"
      >
        <div class="loginPortal">
          <vue-img class="logo" :src="logo" alt="Logo" />
          <h3>
            Login
          </h3>
          <vue-form :ctx="handleLogin.bind(this)" tag="loginForm">
            <template v-slot:formElements>
              <text-input
                label="User name"
                name="textTextField"
                :value="username"
                placeholder="JohnDoe123!"
                :required="booleanTrue"
                input-icon="fas fa-at"
                @value="val => (username = val)"
              />
              <password-input
                :value="password"
                label="Password"
                name="usernameTextField"
                placeholder="*************"
                :required="booleanTrue"
                input-icon="far fa-user"
                :autocomplete="booleanTrue"
                @value="val => (password = val)"
              />
            </template>
          </vue-form>
        </div>
      </vue-modal>
    </header>
    <router-view />
  </div>
</template>

<script lang="ts">
import vueModal from "@/components/modal/vueModal.vue";
import vueImg from "@/components/image/vueImg.vue";
import vueForm from "@/components/form/vueForm.vue";
import textInput from "@/components/form/textInput.vue";
import passwordInput from "@/components/form/passwordInput.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: { vueModal, vueImg, textInput, vueForm, passwordInput },

  setup() {
    const showModal = ref(true);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const logo = require("@/assets/logo.svg");
    const username = ref("");
    const password = ref("");
    const booleanTrue = true;

    const handleLogin = () => {
      showModal.value = !showModal.value;
      alert("loggedIn");
    };

    return { showModal, handleLogin, logo, password, username, booleanTrue };
  }
});
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
header {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  padding: 8px 32px;

  .loginPortal {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    .logo {
      height: 80px;
    }
    & > h3 {
      align-self: center;
    }
  }

  & > nav {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;
      margin: 0 8px;
      padding: 16px;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
  & > div {
    align-self: center;
  }
}
</style>
