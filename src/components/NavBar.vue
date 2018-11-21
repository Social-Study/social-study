<template>
  <header class="navbar">

    <section class="navbar-section">
      <a href="#" class="navbar-brand m-2">Social Study</a>
    </section>

    <profile-settings :user="this.user" @closeSettings="isSettingsActive = false" v-show="isSettingsActive" />

    <!-- Right Side Menu and Avatar -->
    <section class="navbar-section">
      <div @mouseover="menuActive = true" @mouseout="menuActive = false" class="menu-container">
        <Avatar :user="this.user" />
        <ul v-show="menuActive == true" class="menu">
          <li class="menu-item text-left">
            <a @click="isSettingsActive = true" href="#">
              <v-icon name="cog" class="icon float-right" />
              Settings
            </a>
          </li>
          <li class="menu-item text-left">
            <a @click="logOut" href="#">
              <v-icon name="sign-out-alt" class="float-right" />
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
import ProfileSettings from "@/components/ProfileSettings";
import firebase from "@/firebaseConfig";

export default {
  name: "NavBar",
  props: {
    user: Object
  },
  components: {
    Avatar,
    ProfileSettings
  },
  data: function() {
    return {
      menuActive: false,
      isSettingsActive: false
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
  max-height: 8vh;
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
