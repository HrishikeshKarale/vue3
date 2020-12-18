import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/Less/fontAwesome/fontawesome.less";
import "@/Less/bootstrap.less";

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
