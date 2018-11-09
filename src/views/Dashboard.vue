<template>
  <div>
    <h1>Dashboard</h1>
    <input @click="logout" type="button" value="Log Out">
  </div>
</template>

<script>
import firebase from "@/firebaseConfig";

export default {
  name: "dashboard",
  methods: {
    logout: function() {
      firebase.auth().signOut();
      this.$router.replace("login");
    }
  }
};
</script>
