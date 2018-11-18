import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import firebase from "./firebaseConfig";
import VeeValidate from "vee-validate";
import "vue-awesome/icons/brands/google";
import "vue-awesome/icons/cog";
import "vue-awesome/icons/sign-out-alt";

Vue.config.productionTip = false;

import Icon from "vue-awesome/components/Icon";

Vue.component("v-icon", Icon);

// Client-side validation library for user form inputs
Vue.use(VeeValidate);

// called every time the router attempts to change page. Only logged in users
// can access pages marked requiresAuth in the router
router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged(function(user) {
    // USER is logged in
    if (user) {
      // if the user tries to go to an auth page, allow them
      if (to.matched.some(record => record.meta.requiresAuth)) {
        next();
        // if a user tries to go to the sign in page, redirect them
      } else if (to.name == "landing") {
        next({
          path: "/dashboard"
        });
        // otherwise let them go wherever
      } else {
        next();
      }
      // USER is NOT logged in
    } else {
      // if they try to go to an auth page, redirect them to the landing
      if (to.matched.some(record => record.meta.requiresAuth)) {
        next({
          path: "/landing"
        });
        // otherwise they can access non auth pages
      } else {
        next();
      }
    }
  });
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
