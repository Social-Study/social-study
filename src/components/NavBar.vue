<template>
  <header class="navbar">

    <section class="navbar-section">
      <a href="#" class="navbar-brand m-2">Social Study</a>
    </section>

    <!-- Right Side Menu and Avatar -->
    <section class="navbar-section">
      <div @mouseover="menuActive = true" @mouseout="menuActive = false" class="menu-container">
        <Avatar :user="this.user" />
        <ul v-show="menuActive == true" class="menu">
          <li class="menu-item">
            <a href="#">
              <v-icon name="cog" />
              Settings
            </a>
          </li>
          <li class="menu-item">
            <a @click="logOut" href="#">
              <v-icon name="sign-out-alt" />
              Log Out
            </a>
          </li>
        </ul>
      </div>
    </section>

  </header>
</template>

<script>
import Avatar from "@/components/Avatar";
import firebase from "@/firebaseConfig";

export default {
  name: "NavBar",
  props: {
    user: Object
  },
  components: {
    Avatar
  },
  data: function() {
    return {
      menuActive: false
    };
  },
  methods: {
    logOut: function() {
      firebase.auth().signOut();
      this.$router.replace("login");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styleVariables.scss";

.navbar {
  background-image: $nav-gradient;
  padding: 0px 10px;
}

.navbar-brand {
  font-family: $logo-font;
  font-size: 2em;
  color: white;
}

.menu {
  position: absolute;
  // position: fixed;
  top: 30px;
  right: 30px;
}
</style>
