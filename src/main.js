import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

import VueFire from "vuefire";
Vue.use(VueFire);

// Client-side validation library for user form inputs
import VeeValidate from "vee-validate";
Vue.use(VeeValidate);

import Notification from "vue-notification";
Vue.use(Notification);

Vue.config.productionTip = false;

// Enable VueFire

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
