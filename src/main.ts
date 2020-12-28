import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import '@/less/bootstrap.less'
import '@/less/fontAwesome/fontawesome.less'

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
