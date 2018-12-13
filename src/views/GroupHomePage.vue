<template>
  <!-- <div v-if="studyGroup">
    <div v-if="studyGroup.length !== 0"> -->
  <page-title>{{ $store.getters.activeGroup.details.className }} Home</page-title>
  <!-- </div>
    <div v-else>
      <h1 style="margin-top: 25%">Error Loading Your Study Group</h1>
      <p>Make sure you are a member of the group!</p>
    </div>
  </div>
  <div v-else>
    <div class="loading loading-lg"></div>
  </div> -->
</template>

<script>
import { db } from "../firebaseConfig";
import SideBar from "../components/SideBar";
import PageTitle from "../components/PageTitle";

export default {
  name: "GroupHomePage",
  components: {
    SideBar,
    PageTitle
  }
  // data: function() {
  //   return {
  //     studyGroup: null
  //   };
  // },
  // // created() {
  // //   this.studyGroup = this.$store.getters.activeGroup.details;
  // // },
  // // REMOVED ALL LOGIC FROM THE HOMEPAGE, THE SIDEBAR NOW HANDLES THIS LOGIC
  // mounted() {
  //   // Check if the study group has changed by checking id of group in store
  //   // with the router's group id. If they are different reload the group data,
  //   // otherwise just set the study group to the stored details
  //   if (
  //     this.$store.getters.activeGroup.groupID !== this.$route.params.groupID
  //   ) {
  //     this.loadGroupData(this.$route.params.groupID);
  //   } else {
  //     this.studyGroup = this.$store.getters.activeGroup.details;
  //   }
  // },
  // methods: {
  //   loadGroupData(groupID) {
  //     console.log("Hompage: Loading group data function");
  //     // Load study group from the route params
  //     this.$bind("studyGroup", db.collection("study-groups").doc(groupID))
  //       .then(studyGroup => {
  //         this.studyGroup === studyGroup;
  //       })
  //       .then(() => {
  //         this.$store.commit("setActiveGroup", {
  //           groupID: groupID,
  //           details: this.studyGroup
  //         });
  //       });
  //   }
  // },
  // watch: {
  //   /* Manually reload new group's data when the route address changes.
  //       without this, the data never gets loaded because you are switching
  //       inside the same component so it doesn't re-render
  //   */
  //   "$route.params.groupID"(id) {
  //     this.studyGroup = this.$store.getters.activeGroup.details;
  //   }
  // }
};
</script>
