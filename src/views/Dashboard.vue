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
