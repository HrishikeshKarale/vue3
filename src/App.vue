<template>
  <div>
    <header>
      <nav>
        <router-link to="/">Home</router-link>
        | <router-link to="/toDoApp">To Do app</router-link> |
        <router-link to="/calendar">Calendar</router-link> |
        <router-link to="/markdown">Markdown</router-link> |
        <router-link to="/slider">Slider Carousel</router-link> |
        <router-link to="/calculator">Calculator</router-link>
      </nav>
      <vue-modal
        v-if="!isLoggedIn"
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
                :alert="alertObject"
                placeholder="JohnDoe123!"
                :required="booleanTrue"
                :autofocus="booleanTrue"
                icon="fas fa-at"
                @notify="notify"
                @value="val => (username = val)"
              />
              <password-input
                :value="password"
                label="Password"
                name="usernameTextField"
                placeholder="*************"
                :required="booleanTrue"
                icon="far fa-user"
                :autocomplete="booleanTrue"
                @value="val => (password = val)"
              />
            </template>
          </vue-form>
        </div>
      </vue-modal>
      <vue-button
        v-else
        tag="logout"
        text="Logout"
        icon="fas fa-sign-in-alt"
        category="small"
        :ctx="handleLogout.bind(this)"
      />
      <vue-modal v-if="isLoading" :showModal="isLoading">
        <div class="loading">
          <spinner />
          <h2>Loading</h2>
        </div>
      </vue-modal>
    </header>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive, watch } from "vue";

import vueModal from "@/components/modal/vueModal.vue";
import vueButton from "@/components/button/vueButton.vue";
import spinner from "@/components/loading/spinner.vue";
import vueImg from "@/components/image/vueImg.vue";
import vueForm from "@/components/form/vueForm.vue";
import textInput from "@/components/form/textInput.vue";
import passwordInput from "@/components/form/passwordInput.vue";

import notify from "@/typeScript/notify";

import firebase from "@/typeScript/utilities/firebase";

export default defineComponent({
  components: {
    vueModal,
    vueButton,
    spinner,
    vueImg,
    textInput,
    vueForm,
    passwordInput
  },

  setup() {
    const showModal = ref(false);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const logo = require("@/assets/logo.svg");
    const username = ref("");
    const password = ref("");
    const booleanTrue = true;
    const isLoggedIn = ref(!booleanTrue);
    const isLoading = ref(!booleanTrue);
    const appUser = reactive({ user: {} });

    const { alertObject } = notify();

    const handleSignup = () => {
      isLoading.value = true;
      firebase
        .auth()
        .createUserWithEmailAndPassword(username.value, password.value)
        .then((user: object) => {
          isLoggedIn.value = true;
          appUser.user = user;
          // Signed in
          // ...
        })
        .catch((error: object) => {
          console.error(error);
          // const errorCode = error.code;
          // const errorMessage = error.message;
          // ..
        })
        .finally(() => {
          isLoading.value = false;
        });
    };

    const handleLogout = () => {
      isLoading.value = true;
      firebase
        .auth()
        .signOut()
        .then(() => {
          isLoggedIn.value = false;
          appUser.user = {};
        })
        .catch((error: object) => {
          console.error(error);
          // An error happened.
        })
        .finally(() => {
          isLoading.value = false;
        });
    };

    const IsAuthenticated = () => {
      isLoggedIn.value = true;
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          isLoggedIn.value = true;
          appUser.user = user;
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          // var uid = user.uid;
          // ...
        } else {
          isLoggedIn.value = false;
          appUser.user = {};
          // User is signed out
          // ...
        }
      });
    };

    const handleLogin = () => {
      console.log("app", username.value, password.value);
      isLoading.value = true;
      // using custom token
      // firebase.auth().signInWithCustomToken(token)
      //   .then((user) => {
      //     // Signed in
      //     // ...
      //   })
      //   .catch((error) => {
      //     var errorCode = error.code;
      //     var errorMessage = error.message;
      //     // ...
      //   });
      firebase
        .auth()
        .signInWithEmailAndPassword(username.value, password.value)
        .then((user: object) => {
          isLoggedIn.value = true;
          appUser.user = user;
        })
        .catch((error: object) => {
          console.error(error);
          // var errorCode = error.code;
          // var errorMessage = error.message;
        })
        .finally(() => {
          isLoading.value = false;
        });
      // showModal.value = !showModal.value;
      // alert("loggedIn");
    };

    watch(isLoggedIn, (newValue, oldValue) => {
      if (newValue != oldValue) {
        showModal.value = newValue;
      }
    });

    onMounted(() => {
      IsAuthenticated();
    });

    return {
      showModal,
      logo,
      password,
      username,
      booleanTrue,
      handleLogout,
      handleLogin,
      IsAuthenticated,
      handleSignup,
      isLoading,
      notify,
      alertObject,
      isLoggedIn
    };
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
  justify-content: space-between;
  align-items: center;

  .loginPortal,
  .loading {
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
  .loading {
    align-items: center;
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
}
</style>
