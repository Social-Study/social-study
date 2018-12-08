import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

import firebase from "./firebaseConfig";
import VueFire from "vuefire";
import VeeValidate from "vee-validate";

// Icon Imports
import "vue-awesome/icons/brands/google";
import "vue-awesome/icons/cog";
import "vue-awesome/icons/sign-out-alt";
import Icon from "vue-awesome/components/Icon";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en";

Vue.use(ElementUI, { locale });

Vue.component("v-icon", Icon);

Vue.config.productionTip = false;

// Client-side validation library for user form inputs
Vue.use(VeeValidate);

// Enable VueFire
Vue.use(VueFire);

// Prevents navigation to certain pages if you are not logged in
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  if (to.matched.some(record => record.meta.requiresAuth)) {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        next({
          path: "/landing"
        });
      } else {
        next();
      }
    });
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
