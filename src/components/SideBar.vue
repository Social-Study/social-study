<template>
  <div class="off-canvas off-canvas-sidebar-show">
    <!-- Sidebar Toggle Button; Only shows when screen is too small -->
    <a
      @click="sidebarActive = true;"
      class="off-canvas-toggle btn btn-primary btn-action"
    >
      <i class="fas fa-bars"></i>
    </a>

    <div
      v-if="activeGroup"
      id="sidebar-id"
      class="off-canvas-sidebar"
      :class="{ active: sidebarActive }"
    >
      <li
        style="margin: 0"
        class="divider"
      ></li>

      <ul class="menu sidebar">
        <li
          class="menu-item"
          style="padding-top: 10px;"
        >
          <div class="tile tile-centered">
            <div class="tile-content">
              <h5>{{ activeGroup.className }}</h5>
              <p style="margin: 0;">{{ activeGroup.instructorName }}</p>
            </div>
          </div>
        </li>
        <li class="divider"></li>
        <li class="menu-item"></li>

        <!-- Change the active highlight depending on the current page name -->
        <li class="menu-item text-left">
          <router-link
            :class="$route.name === 'home' ? 'active' : ''"
            :to="{ name: 'home' }"
          ><i class="fas fa-home"></i> Home</router-link>
        </li>
        <li class="menu-item text-left">
          <router-link
            :class="
              $route.name === 'flashcards' ? 'active' : '' ||
              $route.name === 'study' ? 'active' : '' ||
              $route.name === 'create' ? 'active' : ''"
            :to="{ name: 'flashcards' }"
          >
            <i class="fas fa-sticky-note"></i> Flashcards
          </router-link>
        </li>
        <li class="menu-item text-left">
          <a :class="$route.name === 'quiz' ? 'active' : ''"><i class="fas fa-pencil-alt"></i> Quiz</a>
        </li>
        <li class="menu-item text-left">
          <a :class="$route.name === 'agenda' ? 'active' : ''"><i class="fas fa-calendar-alt"></i> Agenda</a>
        </li>
        <li class="menu-item text-left">
          <router-link
            :to="{name: 'notes'}"
            :class="$route.name === 'notes' ? 'active' : '' ||
               $route.name === 'note' ? 'active' : ''"
          >
            <i class="fas fa-file"></i> Notes
          </router-link>
        </li>
        <li class="menu-item text-left">
          <div class="menu-badge">
            <label class="member-num label label-primary">{{
              activeGroup.members.length
              }}</label>
          </div>
          <router-link
            :class="$route.name === 'members' ? 'active' : ''"
            :to="{ name: 'members' }"
          ><i class="fas fa-user-circle"></i> Members</router-link>
        </li>
        <li
          v-if="activeGroup.owner === $store.getters.uid"
          class="menu-item text-left"
        >
          <router-link
            :to="{name: 'settings'}"
            :class="$route.name === 'settings' ? 'active' : ''"
          >
            <i class="fas fa-cog"></i> Settings
          </router-link>
          <!-- <a><i class="fas fa-cog"></i> Group Settings</a> -->
        </li>
      </ul>
    </div>

    <!--
      Overlay that shows when screen is too small. Clicking hides the sidebar
    -->
    <a
      @click="sidebarActive = false;"
      class="off-canvas-overlay"
    ></a>

    <div class="off-canvas-content">
      <!-- Slot where all other page content will be inserted -->
      <slot v-if="isMember && !isLoading"></slot>

      <!-- If they are not a member, show the generic error message -->
      <div
        v-else-if="!isMember && !isLoading"
        style="margin-top: 10%;"
      >
        <img
          style="width: 10em;"
          class="undraw-svg"
          src="../assets/undraw_warning.svg"
          alt="Error Loading Group"
        />
        <h1>Error loading group data...</h1>
        <h2>Please make sure you are a member of the group.</h2>
        <h2>Please make sure the group exists.</h2>
      </div>
      <div v-else>
        <div class="loading loading-lg"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { checkAccess } from "../scripts/groupFuncs";
import { db } from "../firebaseConfig";

// The sidebar is in charge of managing the group's initial load state.
export default {
  name: "SideBar",
  data() {
    return {
      sidebarActive: false,
      activeGroup: null,
      isMember: false,
      isLoading: true
    };
  },
  created() {
    this.loadGroupData(this.$route.params.groupID);
  },
  methods: {
    loadGroupData(groupID) {
      // Make sure the user is part of the group
      checkAccess(this.$store.getters.uid, this.$route.params.groupID)
        .then(() => {
          // If they are... load the group's data.
          this.$bind(
            "activeGroup",
            db.collection("study-groups").doc(groupID)
          ).then(active => {
            this.activeGroup === active;
          });

          this.isMember = true;
          this.isLoading = false;
        })
        .catch(() => {
          console.log("load error!");

          this.isLoading = false;
        });
    }
  },
  watch: {
    "$route.params.groupID"(id) {
      this.loadGroupData(id);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styleVariables.scss";

a.off-canvas-toggle {
  margin-top: 100%;
}

.sidebar {
  box-shadow: none;
  background: $dark;
  // background: #3c3c3c;
}

.member-num {
  padding-left: 8px;
  padding-right: 8px;
}

.sidebar > li.menu-item {
  color: white;
}

.sidebar > li > a.active {
  background-image: $orange-gradient !important;
  color: white !important;
}
div.off-canvas-sidebar {
  background: $dark !important;
  // background: #3c3c3c !important;
  width: 200px;
}

div.off-canvas {
  // height: 100%;
  height: calc(100% - 60px);
}

div.off-canvas-content {
  min-height: 100%;
  overflow: auto;
  padding: 0 !important;
}
</style>
