<template>

  <div>
    <NavBar :user="this.user" />
    <h1>Welcome to Social Study, {{ user.displayName }}</h1>
  </div>
</template>

<script>
import firebase from "@/firebaseConfig";
import NavBar from "@/components/NavBar";

// TODO: Figure out if we need to get the user from firebase on each view.
// May just be able to reference and set a single global variable.
// I think we should implement VUEX store to handle this. The user account is
// the most central part of the application
export default {
  name: "dashboard",
  components: {
    NavBar
  },
  data: function() {
    return {
      user: null
    };
  },
  beforeMount: function() {
    this.user = firebase.auth().currentUser;
  },
  methods: {}
};
</script>

<style lang="sass" scoped>


</style>
