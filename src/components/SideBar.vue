<template>
  <div class="off-canvas off-canvas-sidebar-show">
    <!-- off-screen toggle button -->
    <a
      @click="sidebarActive = true"
      class="off-canvas-toggle btn btn-primary btn-action"
    >
      <i class="icon icon-menu"></i>
    </a>

    <div
      v-if="activeGroup"
      id="sidebar-id"
      class="off-canvas-sidebar"
      :class="{ active : sidebarActive }"
    >
      <ul class="menu sidebar">
        <li
          class="menu-item"
          style="padding-top: 10px;"
        >
          <div class="tile tile-centered">
            <div class="tile-content">
              <h5>{{activeGroup.className}}</h5>
              <p style="margin: 0;">{{activeGroup.instructorName}}</p>
            </div>
          </div>
        </li>
        <li class="divider"></li>
        <li class="menu-item">
        </li>
        <!-- Change the active highlight depending on the current page name -->
        <li class="menu-item text-left">
          <router-link
            :class="$route.name === 'home' ? 'active' : ''"
            :to="{ name: 'home'}"
          >Home</router-link>
        </li>
        <li class="menu-item text-left">
          <router-link
            :class="$route.name === 'flashcards' ? 'active' : ''"
            :to="{ name: 'flashcards'}"
          >Flashcards</router-link>
          <!-- <a :class="$route.name === 'flashcards' ? 'active' : ''">Flashcards</a> -->
        </li>
        <li class="menu-item text-left">
          <a :class="$route.name === 'quiz' ? 'active' : ''">Quiz</a>
        </li>
        <li class="menu-item text-left">
          <a :class="$route.name === 'agenda' ? 'active' : ''">Agenda</a>
        </li>
        <li class="menu-item text-left">
          <a :class="$route.name === 'notes' ? 'active' : ''">Notes</a>
        </li>
        <li class="menu-item text-left">
          <div class="menu-badge">
            <label class="member-num label label-primary">{{activeGroup.members.length}}</label>
          </div>
          <router-link
            :class="$route.name === 'members' ? 'active' : ''"
            :to="{ name: 'members'}"
          >Members</router-link>
        </li>
      </ul>
    </div>

    <a
      @click="sidebarActive = false"
      class="off-canvas-overlay"
    ></a>

    <div class="off-canvas-content">
      <!-- Slot where all other page content will be inserted -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { db } from "../firebaseConfig";

export default {
  name: "SideBar",
  data() {
    return {
      sidebarActive: false,
      activeGroup: null
    };
  },
  created() {
    // TODO: Figure out how to prevent sidebar from reloading on page changes.
    this.loadGroupData(this.$route.params.groupID);
    // if (
    //   this.$route.params.groupID !== this.$store.getters.activeGroup.groupID
    // ) {
    //   console.log("sidebar create reloading ");
    // } else {
    //   console.log("sidebar not recreating");
    // }

    // this.activeGroup = this.$store.getters.activeGroup.details;
    // console.log(this.activeGroup.members);
  },
  methods: {
    loadGroupData(groupID) {
      console.log("Sidebar: Loading Group Data function...");
      // Load study group from the route params
      this.$bind(
        "activeGroup",
        db.collection("study-groups").doc(groupID)
      ).then(active => {
        this.activeGroup === active;
      });
    }
  },
  watch: {
    "$route.params.groupID"(id) {
      console.log(
        "Sidebar: Active Group Changed - Getting new data from firestore"
      );
      this.loadGroupData(id);
    }
  }
};
</script>

// @HACK: Have to set !important on certain styling to override spectre defaults
// Must be global styling not scoped to take affect
<style lang="scss">
.sidebar {
  box-shadow: none;
  background: #3c3c3c;
}

.member-num {
  padding-left: 8px;
  padding-right: 8px;
  /* padding: 10px; */
}

.sidebar > li.menu-item {
  color: white;
}

.sidebar > li > a.active {
  background-image: linear-gradient(90deg, #ffa404 0%, #ff0479 100%) !important;
  color: white !important;
}
div.off-canvas-sidebar {
  background: #3c3c3c !important;
  width: 200px;
}
div.off-canvas-content {
  min-height: 94vh;
}
</style>
