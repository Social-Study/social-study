import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

import VueFire from "vuefire";
import VeeValidate from "vee-validate";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en";

import Notification from "vue-notification";
Vue.use(Notification);

Vue.use(ElementUI, { locale });

Vue.config.productionTip = false;

// Client-side validation library for user form inputs
Vue.use(VeeValidate);

// Enable VueFire
Vue.use(VueFire);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
