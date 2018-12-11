<template>
  <header class="navbar">
    <section class="navbar-section">
      <router-link
        class="navbar-brand"
        to="/dashboard"
      >Social Study</router-link>

      <!-- Study Group Switcher -->
      <div
        v-if="studyGroups.length > 0"
        class="dropdown"
      >
        <a
          class="btn btn-primary dropdown-toggle"
          tabindex="0"
        >
          Your Study Groups<i class="icon icon-caret"></i>
        </a>
        <!-- Your Study Group List Dropdown Items -->
        <ul class="menu">
          <li
            v-for="(group, index) in studyGroups"
            :key="index"
          >
            <!-- <a @click="switchGroup(group.id)">{{group.className}}</a> -->
            <router-link :to="{ name: 'home', params: { groupID: group.id }}">{{group.className}}</router-link>
          </li>
        </ul>
      </div>

      <!-- Create New Study Group Button -->
      <button
        @click="$router.push('/dashboard/create')"
        style="margin: 0 10px;"
        class="btn btn-link btn-action btn-create"
      ><i class="icon icon-plus"></i></button>

    </section>

    <profile-settings
      v-if="user && firestoreUser"
      profile-settings
      :user="this.user"
      :photoURL="this.firestoreUser.photoURL"
      @closeSettings="isSettingsActive = false"
      v-show="isSettingsActive"
    />

    <!-- Right Side Menu and Avatar -->
    <section class="navbar-section">
      <div
        @mouseover="menuActive = true"
        @mouseout="menuActive = false"
        class="menu-container"
      >
        <Avatar
          v-if="firestoreUser"
          :user="{ displayName: this.firestoreUser.displayName,
                   photoURL: this.firestoreUser.photoURL
                 }"
        />
        <div
          v-else
          style="background-color: #3c3c3c; border-radius: 50%; height: 48px; width: 48px;"
          class="loading loading-lg"
        ></div>

        <ul
          v-show="menuActive == true"
          class="menu"
        >
          <li class="menu-item text-left">
            <p
              v-if="user"
              class="h5"
            >{{ user.displayName }}</p>
          </li>
          <li class="divider"></li>
          <li class="menu-item text-left">
            <a
              @click="isSettingsActive = true"
              href="#"
            >
              <v-icon
                name="cog"
                class="icon float-right"
              />
              Settings
            </a>
          </li>
          <li class="menu-item text-left">
            <a
              @click="logOut"
              href="#"
            >
              <v-icon
                name="sign-out-alt"
                class="float-right"
              />
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
import firebase, { db } from "@/firebaseConfig";

export default {
  name: "NavBar",
  components: {
    Avatar,
    ProfileSettings
  },
  data: function() {
    return {
      menuActive: false,
      isSettingsActive: false,
      user: null,
      firestoreUser: null,
      studyGroups: []
    };
  },
  created() {
    this.$bind(
      "firestoreUser",
      db.collection("users").doc(this.$store.getters.uid)
    ).then(user => {
      this.firestoreUser === user;
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        this.$store.commit("setUID", user.uid);

        this.$bind(
          "studyGroups",
          db
            .collection("study-groups")
            .where("members", "array-contains", this.$store.getters.uid)
        ).then(studyGroups => {
          this.studyGroups === studyGroups;
        });
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    logOut: function() {
      firebase.auth().signOut();
      this.$router.push("/");
    },
    switchGroup(id) {
      this.$router.push(`/${id}/home`);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styleVariables.scss";

.navbar {
  background-image: $nav-gradient;
  padding: 0px 10px;
  max-height: 6vh;
  min-height: 6vh;
}

a.navbar-brand {
  font-family: $logo-font;
  font-size: 1.7em;
  margin-right: 20px;
  color: white;
}

.menu {
  position: absolute;
  // position: fixed;
  top: 30px;
  right: 30px;
}

.btn-create:hover {
  background-color: white;
}

.h5 {
  margin: 0;
}
</style>
