
<template>
  <div v-if="userAuthorized && !isLoading">
    <page-title>
      <template slot="center">Study Group Admin Settings</template>
    </page-title>
    <notifications
      group="save"
      position="left top"
    />
    <div class="container">
      <div class="columns">
        <div class="column col-5 col-mx-auto col-xl-10">
          <div class="group-details">
            <h2>Edit Group Details</h2>

            <form
              v-if="!loading.details"
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
                <div
                  class="col-9"
                  id="time-group"
                >
                  <input
                    class="form-input"
                    type="time"
                    placeholder="Instructor Name"
                    v-model="details.meetingTime[0]"
                    required
                  >
                  -
                  <input
                    class="form-input"
                    type="time"
                    v-model="details.meetingTime[1]"
                    placeholder="Instructor Name"
                    required
                  >
                </div>
              </div>

              <!-- Meeting Days -->
              <div class="form-group day-selector">
                <label
                  class=" col-3 form-label"
                  for="input-example-1"
                >Meeting Days</label>
                <div class="col-9 btn-group btn-group-block">
                  <button
                    @click.prevent="toggle('monday');"
                    :class="details.meetingDays.monday ? 'active' : ''"
                    class="btn btn-block"
                  >
                    Mon
                  </button>
                  <button
                    @click.prevent="toggle('tuesday');"
                    :class="details.meetingDays.tuesday ? 'active' : ''"
                    class="btn btn-block"
                  >
                    Tue
                  </button>
                  <button
                    @click.prevent="toggle('wednesday');"
                    :class="details.meetingDays.wednesday ? 'active' : ''"
                    class="btn btn-block"
                  >
                    Wed
                  </button>
                  <button
                    @click.prevent="toggle('thursday');"
                    :class="details.meetingDays.thursday ? 'active' : ''"
                    class="btn btn-block"
                  >
                    Thu
                  </button>
                  <button
                    @click.prevent="toggle('friday');"
                    :class="details.meetingDays.friday ? 'active' : ''"
                    class="btn btn-block"
                  >
                    Fri
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
          <div v-else class="loading loading-lg"></div>
          <button v-if="!loading.details"
              class="btn"
              id="save-btn"
              @click="saveData"
            >Save Changes <i class="fas fa-save"></i>
            </button>
            </div>
        </div>
        <div class="column col-6 col-xl-12">

          <div class="columns">
            <div class="group-details column col-10 col-mx-auto">
              <h2>Active Invite Codes</h2>
              <table v-if="!loading.codes" class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th style="width: 95%;">Code</th>
                    <th class="text-center">Revoke?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="code in inviteCodes" :key="code">
                    <td style="width: 95%;">{{code}}</td>
                    <td class="button-td">
                      <button @click="removeCode(code)" class="btn btn-action btn-error">
                        <i class="fas fa-times"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-else class="loading loading-lg"></div>
            </div>
            <div class="group-details column col-10  col-mx-auto">
              <h2>Study Group Members</h2>
              <table v-if="!loading.members" class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th style="width: 95%;">Name</th>
                    <th class="text-center">Remove?</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Show all members but you; the admin -->
                  <tr v-if="member.uid !== $store.getters.uid" v-for="member in memberDetails" :key="member.uid ">
                    <td style="width: 95%;">{{member.displayName}}</td>
                    <td class="button-td">
                      <button @click="removeMember(member.uid)" class="btn btn-action btn-error">
                        <i class="fas fa-times"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-else class="loading loading-lg"></div>
            </div>
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
import PageTitle from "@/components/navigation/PageTitle";
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
      loading: {
        details: true,
        codes: true,
        members: true
      },
      // Group Details Bindings
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
    },
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
        })
        .then(() => {
          this.$notify({
            group: "save",
            type: "success",
            title: "Changes Saved",
            text: "All details successfully saved!"
          });
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
      this.loading;
      db.collection("study-groups")
        .doc(this.$route.params.groupID)
        .get()
        .then(doc => {
          this.loading.codes = false;
          this.loading.details = false;
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
                    this.loading.members = false;
                  }
                }
              });
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    parseDays(days) {
      // Generate date object for the day picker from an array of day names
      let parsedDays = {};
      days.forEach(element => {
        parsedDays[element.toLowerCase()] = true;
      });
      return { ...this.details.meetingDays, ...parsedDays };
    },
    removeMember(uid) {
      // Remove a member from the study group
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
    // Toggle the day on or off (day selector buttons)
    toggle(key) {
      this.details.meetingDays[key] = !this.details.meetingDays[key];
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../styleVariables";

#save-btn {
  margin: 10px 0 20px 0;
}

#time-group {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
}

input[type="time"] {
  width: 120px;
}

.container {
  margin-top: 40px;
}

.button-td {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}

.group-details {
  padding: 0;
  box-shadow: $shadow-heavy;
  border-radius: 16px;
  background-color: whitesmoke;
  margin-bottom: 40px;
  h2 {
    border-radius: 16px 16px 0 0;
    background-color: $primary;
    color: $light;
    padding: 5px;
  }

  form {
    padding: 10px;
  }
  table {
    margin: auto;
    width: 95%;
    margin: auto;
    margin: auto;
    border-radius: 16px;
  }
}
</style>
