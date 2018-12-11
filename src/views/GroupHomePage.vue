<template>
  <div v-if="studyGroup">
    <side-bar>
      <div v-if="studyGroup.length !== 0">

        <h1>Home Page for {{ this.studyGroup.className }}</h1>
        <h3></h3>
      </div>
      <div v-else>
        <h1 style="margin-top: 25%">Error Loading Your Study Group</h1>
        <p>Make sure you are a member of the group!</p>
      </div>
    </side-bar>
  </div>
  <div v-else>
    <div class="loading loading-lg"></div>
  </div>
</template>

<script>
import { db } from "../firebaseConfig";
import SideBar from "../components/SideBar";
export default {
  name: "GroupHomePage",
  components: {
    SideBar
  },
  data: function() {
    return {
      groupID: "",
      studyGroup: null
    };
  },
  created() {
    this.loadGroupData(this.$route.params.groupID);
  },
  methods: {
    loadGroupData(groupID) {
      // Load study group from the route params
      this.$bind("studyGroup", db.collection("study-groups").doc(groupID))
        .then(studyGroup => {
          this.studyGroup === studyGroup;
        })
        .then(() => {
          this.$store.commit("setActiveGroupDetails", {
            className: this.studyGroup.className,
            instructorName: this.studyGroup.instructorName,
            memberCount: this.studyGroup.members.length
          });
        });
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

// cannot be scoped, or else it will not override the default sidebar and menu styling
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
