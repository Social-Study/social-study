<template>
  <div class="off-canvas off-canvas-sidebar-show">
    <!-- Sidebar Toggle Button; Shows when width < 768px -->
    <a
      @click="sidebarActive = true;"
      class="off-canvas-toggle btn btn-primary btn-action"
    >
      <i class="fas fa-bars"></i>
    </a>

    <!-- Sidebar Display Controls -->
    <div
      v-if="activeGroup"
      id="sidebar-id"
      class="off-canvas-sidebar"
      :class="{ active: sidebarActive }"
    >
      <!-- Top Divider; Only shows when sidebar not collapsed -->
      <div
        v-show="!sidebarActive"
        style="margin: 0"
        class="divider"
      ></div>

      <!-- Sidebar Content -->
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

        <!-- Menu highlight based on current route -->

        <!-- Home -->
        <li class="menu-item text-left">
          <router-link
            :class="$route.name === 'home' ? 'active' : ''"
            :to="{ name: 'home' }"
          ><i class="fas fa-home"></i> Home</router-link>
        </li>

        <!-- Flashcards -->
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
        <!-- Quizzes -->
        <li class="menu-item text-left">
          <a :class="$route.name === 'quiz' ? 'active' : ''"><i class="fas fa-pencil-alt"></i> Quiz</a>
        </li>
        <!-- Agenda -->
        <li class="menu-item text-left">
          <a :class="$route.name === 'agenda' ? 'active' : ''"><i class="fas fa-calendar-alt"></i> Agenda</a>
        </li>
        <!-- Notes -->
        <li class="menu-item text-left">
          <router-link
            :to="{name: 'notes'}"
            :class="$route.name === 'notes' ? 'active' : '' ||
               $route.name === 'note' ? 'active' : ''"
          >
            <i class="fas fa-file"></i> Notes
          </router-link>
        </li>
        <!-- Group Members -->
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
        <!-- Group Settings -->
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
        </li>
      </ul>
    </div>

    <!-- Overlay when collapsed sidebar is open -->
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
          src="@/assets/undraw_warning.svg"
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
import { checkAccess } from "@/scripts/groupFuncs";
import { db } from "@/firebaseConfig";

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
  // Reload group data if the group's url changes
  watch: {
    "$route.params.groupID"(id) {
      this.loadGroupData(id);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styleVariables.scss";

a.off-canvas-toggle {
  position: fixed;
  left: 0;
  top: 120px;
  bottom: 0;
  margin-left: 8px;
}

.tile-content {
  color: white;
}

.sidebar {
  box-shadow: none;
  background: $dark;
}

.sidebar > li.menu-item {
  color: $secondary-light;

  i.fas {
    color: darken($secondary-light, 30);
  }
}

.sidebar > li > a.active {
  background-image: $orange-gradient !important;
  color: white !important;

  i.fas {
    color: white;
  }
}

.member-num {
  padding-left: 8px;
  padding-right: 8px;
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
  // min-height: 100%;
  height: calc(100% - 60px);
  overflow: auto;
  padding: 0 !important;
}
</style>
