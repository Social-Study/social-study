<template>
  <div>
    <h1>Welcome to Social Study, {{ user.displayName }}</h1>
    <a @click="logout" href="#" class="btn">
      Log Out
    </a>
  </div>
</template>

<script>
import firebase from "@/firebaseConfig";
// TODO: Figure out if we need to get the user from firebase on each view.
// May just be able to reference and set a single global variable.
// I think we should implement VUEX store to handle this. The user account is
// the most central part of the application
export default {
  name: "dashboard",
  data: function() {
    return {
      user: null
    };
  },
  beforeMount: function() {
    this.user = firebase.auth().currentUser;
  },
  methods: {
    logout: function() {
      firebase.auth().signOut();
      this.$router.replace("login");
    }
  }
};
</script>

<style lang="sass" scoped>


</style>
