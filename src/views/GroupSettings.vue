<template>
  <div v-if="userAuthorized && !isLoading">
    <page-title>
      <template slot="center">Study Group Admin Settings</template>
      <template slot="right"><button
          class="btn btn-action"
          @click="saveData"
        ><i class="fas fa-save"></i></button></template>
    </page-title>
    <div class="container">
      <div class="columns">
        <div class="column col-md-12">
          <h2>Edit Group Details</h2>
          <form
            action=""
            class="col-12 form-horizontal"
          >
            <!-- Class Name Input -->
            <div class="form-group">
              <label
                class=" col-3 form-label"
                for="input-example-1"
              >Class Name</label>
              <input
                class="col-9 form-input"
                type="text"
                v-model="details.className"
                placeholder="Class Name"
              >
            </div>

            <!-- Course Code Input (Optional) -->
            <div class="form-group">
              <label
                class=" col-3 form-label"
                for="input-example-1"
              >Course Code</label>
              <input
                class="col-9 form-input"
                type="text"
                v-model="details.courseCode"
                placeholder="Course Code"
              >
            </div>

            <!-- Class Instructor Input -->
            <div class="form-group">
              <label
                class=" col-3 form-label"
                for="input-example-1"
              >Instructor Name</label>
              <input
                class="col-9 form-input"
                type="text"
                v-model="details.instructorName"
                placeholder="Instructor Name"
              >
            </div>

            <!-- Class Meeting Location Input -->
            <div class="form-group">
              <label
                class=" col-3 form-label"
                for="input-example-1"
              >Meeting Location</label>
              <input
                class="col-9 form-input"
                type="text"
                v-model="details.location"
                placeholder="Meeting Location"
              >
            </div>

            <!-- Class Meeting Time Input -->
            <div class="form-group">
              <label
                class=" col-3 form-label"
                for="input-example-1"
              >Meeting Time</label>
              <span class="col-2"></span>
              <input
                class="col-2 form-input"
                type="time"
                v-model="details.meetingTime[0]"
                placeholder="Instructor Name"
              >
              <span class="col-1"> to </span>
              <input
                class="col-2 form-input"
                type="time"
                v-model="details.meetingTime[1]"
                placeholder="Instructor Name"
              >
            </div>

            <!-- Meeting Days -->
            <div class="form-group">
              <label
                class=" col-3 form-label"
                for="input-example-1"
              >Meeting Days</label>
              <div class="col-9 btn-group btn-group-block">
                <button
                  @click.prevent="toggle('monday');"
                  :class="details.meetingDays.monday ? 'active' : ''"
                  class="btn"
                >
                  Monday
                </button>
                <button
                  @click.prevent="toggle('tuesday');"
                  :class="details.meetingDays.tuesday ? 'active' : ''"
                  class="btn"
                >
                  Tuesday
                </button>
                <button
                  @click.prevent="toggle('wednesday');"
                  :class="details.meetingDays.wednesday ? 'active' : ''"
                  class="btn"
                >
                  Wednesday
                </button>
                <button
                  @click.prevent="toggle('thursday');"
                  :class="details.meetingDays.thursday ? 'active' : ''"
                  class="btn"
                >
                  Thursday
                </button>
                <button
                  @click.prevent="toggle('friday');"
                  :class="details.meetingDays.friday ? 'active' : ''"
                  class="btn"
                >
                  Friday
                </button>
              </div>
            </div>

            <!-- Website URL (Optional) -->
            <div class="form-group">
              <label
                class=" col-3 form-label"
                for="input-example-1"
              >Course Website</label>
              <input
                class="col-9 form-input"
                type="url"
                v-model="details.url"
                placeholder="Optional Website URL"
              >
            </div>

            <!-- Study Group Description (Optional-->
            <div class="form-group">
              <label
                class=" col-3 form-label"
                for="input-example-1"
              >Group Description</label>
              <textarea
                class="col-9 form-input"
                type="url"
                v-model="details.description"
                placeholder="Optional Description"
                style="resize: none;"
              />
              </div>
          </form>

           <!-- <div class="column col-12"> -->
              <h2>Active Invite Codes</h2>
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th class="text-center">Revoke?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="code in inviteCodes" :key="code">
                    <td>{{code}}</td>
                    <td>
                      <button @click="removeCode(code)" class="btn btn-block btn-error">
                        <i class="fas fa-times"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            <!-- </div> -->
        </div>
        <div class="column">

            <div class="column col-12">
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th class="text-center">Remove?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="member in memberDetails" :key="member.uid ">
                    <td>{{member.displayName}}</td>
                    <td><button @click="removeMember(member.uid)" class="btn btn-block btn-error"><i class="fas fa-times"></i></button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
      </div>
    </div>
  </div>

  <!-- TODO: Craft error landing page -->
  <h1  v-else-if="!isLoading && !userAuthorized"> WTF ARE YOU DOING HERE</h1>
  <div v-else class="loading loading-lg"></div>
</template>

<script>
/**
 *  Owner Group Priveledges
 *
 *  Change Group Information Data
 *  Manage Group Member List
 *  Manage active invite codes
 *  Transfer Ownership ?
 */

import { checkOwner } from "@/scripts/groupFuncs";
import { db, FirebaseConsts } from "@/firebaseConfig";
import PageTitle from "@/components/PageTitle";

// TODO: Form validation, loading indicators, transfer ownership?

export default {
  name: "GroupSettings",
  components: {
    PageTitle
  },
  created() {
    this.checkAuth();
    this.loadData();
  },
  data() {
    return {
      isLoading: true,
      userAuthorized: false,
      details: {
        className: "",
        courseCode: "",
        instructorName: "",
        location: "",
        meetingTime: [],
        meetingDays: {
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false
        },
        url: "",
        description: ""
      },
      inviteCodes: [],
      memberUID: [],
      memberDetails: []
    };
  },
  methods: {
    saveData() {
      db.collection("study-groups")
        .doc(this.$route.params.groupID)
        .update({
          className: this.details.className,
          courseCode: this.details.courseCode,
          instructorName: this.details.instructorName,
          location: this.details.location,
          meetingTime: this.details.meetingTime,
          meetingDays: this.getDaysArray(this.details.meetingDays),
          websiteURL: this.details.url,
          extraInfo: this.details.description
        });
    },
    getDaysArray() {
      let arr = [];
      Object.keys(this.details.meetingDays).forEach(key => {
        if (this.details.meetingDays[key] === true) {
          arr.push(key.charAt(0).toUpperCase() + key.slice(1));
        }
      });
      return arr;
    },
    loadData() {
      // Get all data from firestore to populate the form
      db.collection("study-groups")
        .doc(this.$route.params.groupID)
        .get()
        .then(doc => {
          let data = doc.data();
          this.details = {
            className: data.className,
            courseCode: data.courseCode,
            instructorName: data.instructorName,
            location: data.location,
            meetingTime: data.meetingTime,
            url: data.websiteURL,
            description: data.extraInfo,
            meetingDays: this.parseDays(data.meetingDays)
          };
          this.memberUID = data.members;
          this.inviteCodes = data.inviteCodes;
        })
        .then(() => {
          let counter = this.memberUID.length;
          this.memberDetails = [];
          this.memberUID.forEach(uid => {
            db.collection("users")
              .where("uid", "==", uid)
              .limit(1)
              .get()
              .then(docSnapshot => {
                if (docSnapshot.size == 1) {
                  counter--;
                  this.memberDetails.push(docSnapshot.docs[0].data());
                  if (counter == 0) {
                    // this.loading = false;
                  }
                }
              });
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    // Generate date object for the day picker from an array of day names
    parseDays(days) {
      let parsedDays = {};
      days.forEach(element => {
        parsedDays[element.toLowerCase()] = true;
      });
      return { ...this.details.meetingDays, ...parsedDays };
    },
    // Remove a member from the study group
    removeMember(uid) {
      db.collection("study-groups")
        .doc(this.$route.params.groupID)
        .update({
          members: FirebaseConsts.firestore.FieldValue.arrayRemove(uid)
        });
      this.memberDetails = this.memberDetails.filter(obj => {
        return obj.uid !== uid;
      });
    },
    // Deactivate a study group invite code
    removeCode(code) {
      db.collection("study-groups")
        .doc(this.$route.params.groupID)
        .update({
          inviteCodes: FirebaseConsts.firestore.FieldValue.arrayRemove(code)
        });
      this.inviteCodes = this.inviteCodes.filter(obj => {
        return obj !== code;
      });
    },
    // Toggle the day on or off
    toggle(key) {
      this.details.meetingDays[key] = !this.details.meetingDays[key];
    },
    daysChanged(days) {
      // Update the state everytime a day button is pressed
      this.details.meetingDays = days;
    },
    // Verify that the user is the owner before showing admin settings
    checkAuth() {
      checkOwner(this.$store.getters.uid, this.$route.params.groupID)
        .then(() => {
          this.userAuthorized = true;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
input[type="time"] {
  width: 120px;
}
</style>
