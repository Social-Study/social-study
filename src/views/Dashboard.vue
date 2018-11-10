<template>
  <div>
    <a @click="logout" href="#" class="button">
      Log Out
    </a>
  </div>
</template>

<script>
import firebase from "@/firebaseConfig";

export default {
  name: "dashboard",
  data: function() {
    return {};
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
