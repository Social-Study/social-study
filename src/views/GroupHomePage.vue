<template>
  <div class="content-container">
    <div class="off-canvas off-canvas-sidebar-show">
      <!-- off-screen toggle button -->
      <a
        @click="sidebarActive = true"
        class="off-canvas-toggle btn btn-primary btn-action"
      >
        <i class="icon icon-menu"></i>
      </a>

      <div
        id="sidebar-id"
        class="off-canvas-sidebar"
        :class="{ active : sidebarActive }"
      >
        <ul class="menu">
          <li
            class="menu-item"
            style="padding-top: 10px;"
          >
            <div class="tile tile-centered">
              <!-- <div class="tile-icon"><img
                  class="avatar"
                  src="../assets/logo.png"
                  alt="Avatar"
                ></div> -->
              <div class="tile-content">
                <h5>{{studyGroup.className}}</h5>
                <p style="margin: 0;">{{studyGroup.instructorName}}</p>
              </div>
            </div>
          </li>
          <li class="divider"></li>
          <li class="menu-item">
            <div class="menu-badge">
              <label class="label label-primary">2</label>
            </div><a
              class="active"
              href="#menus"
            >My profile</a>
          </li>
          <li class="menu-item"><a href="#menus">Settings</a></li>
          <li class="menu-item"><a href="#menus">Logout</a></li>
        </ul>
      </div>

      <a
        @click="sidebarActive = false"
        class="off-canvas-overlay"
      ></a>

      <div class="off-canvas-content">
        <div v-if="studyGroup.length !== 0">

          <h1>Home Page for {{ this.studyGroup.className }}</h1>
          <h3></h3>
        </div>
        <div v-else>
          <h1 style="margin-top: 25%">Error Loading Your Study Group</h1>
          <p>Make sure you are a member of the group!</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import firebase, { db } from "../firebaseConfig";
export default {
  name: "GroupHomePage",
  data: function() {
    return {
      sidebarActive: false,
      groupID: "",
      studyGroup: []
    };
  },
  created() {
    this.loadGroupData(this.$route.params.groupID);
  },
  methods: {
    loadGroupData(groupID) {
      // Load study group from the route params
      this.$bind("studyGroup", db.collection("study-groups").doc(groupID)).then(
        studyGroup => {
          this.studyGroup === studyGroup;
        }
      );
    }
  },
  watch: {
    /* Manually reload component data when switching from another group
     Needed because vue doesn't reload when the routes are the same
     i.e. Already in a study group home page and switch to another with
     different groupID */
    "$route.params.groupID"(id) {
      this.loadGroupData(id);
    }
  }
};
</script>

<style>
/* .content-container {
  /* min-height: 94vh; */
/* } */

.menu {
  box-shadow: none;
}

div.off-canvas-sidebar {
  /* overflow: hidden; */
  background: white !important;
  width: 200px;
  /* min-height: 94vh; */
}

div.off-canvas-content {
  min-height: 94vh;
}
</style>
