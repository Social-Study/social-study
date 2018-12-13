<template>
  <div>
    <h1 class="pageTitle">Create a New Study Group</h1>
    <div class="createContent">

      <div class="navContainer">
        <button
          @click="back"
          class="btn btn-action btn-success btn-lg s-circle"
          :class="active===0 ?'disabled c-not-allowed' : '' "
        >
          <i class="icon icon-arrow-left"></i>
        </button>

        <div
          v-if="active===0"
          class="infoContainer"
        >
          <h2>What is the name of the class?</h2>
          <el-input
            @keydown.enter.native="next"
            placeholder="Class Name"
            v-model="className"
            clearable
          >
          </el-input>
        </div>
        <div
          class="infoContainer"
          v-else-if="active===1"
        >
          <h2>What is the course intructor's name?</h2>
          <el-input
            @keydown.enter.native="next"
            placeholder="Instructor Name"
            v-model="instructorName"
            clearable
          >
          </el-input>
        </div>
        <div
          class="infoContainer"
          v-else-if="active===2"
        >
          <h2>When does your class meet?</h2>
          <el-checkbox-group v-model="meetingDays">
            <el-checkbox-button
              v-for="(day, index) in days"
              :label="day"
              :key="index"
            >{{day}}</el-checkbox-button>
          </el-checkbox-group>
          <br>
          <el-time-picker
            style="margin-top: 20px;"
            format="hh:mm:A"
            is-range
            arrow-control
            v-model="meetingTime"
            range-separator="-"
            start-placeholder="Start time"
            end-placeholder="End time"
          >
          </el-time-picker>
        </div>

        <div
          class="infoContainer"
          v-else-if="active===3"
        >
          <h2>Where does the class meet?</h2>
          <el-input
            @keydown.enter.native="next"
            placeholder="Location"
            v-model="location"
            clearable
          >
          </el-input>
        </div>

        <div
          class="infoContainer"
          v-else-if="active===4"
        >
          <h2>Does your instructor have a website?</h2>
          <el-switch
            v-model="hasWebsite"
            active-text="Yes"
            inactive-text="No"
            active-color="#13ce66"
          >
          </el-switch>
          <br>
          <transition-group name="el-zoom-in-top">

            <el-input
              key="input"
              style="margin-top: 12px;"
              v-show="hasWebsite"
              @keydown.enter.native="next"
              placeholder="Website URL"
              v-model="websiteURL"
              clearable
            >
              <template slot="prepend">https://</template>
            </el-input>
            <br key="break">
            <br key="break2">
            <a
              v-show="hasWebsite && websiteURL !== ''"
              target="_blank"
              key="link"
              :href="formattedURL"
            >{{formattedURL}}</a>
          </transition-group>
        </div>

        <div
          class="infoContainer"
          v-else-if="active===5"
        >
          <h2>Would you like to enter any additional information?</h2>
          <el-switch
            v-model="hasExtraInfo"
            active-text="Yes"
            inactive-text="No"
            active-color="#13ce66"
          >
          </el-switch>
          <br>
          <transition name="el-zoom-in-top">
            <el-input
              style="margin-top: 12px;"
              v-show="hasExtraInfo"
              @keydown.ctrl.enter.native="next"
              type="textarea"
              :rows="4"
              resize="none"
              placeholder="Additional Class Info"
              v-model="extraInfo"
            >
            </el-input>
          </transition>
        </div>

        <div
          class="infoContainer"
          v-else-if="active===6"
        >
          <el-button
            @click="createStudyGroup"
            class="createBtn"
          >
            Create Study Group
          </el-button>
        </div>
        <!-- Show invite code to user -->
        <div
          class="infoContainer"
          v-else-if="active===7"
        >
          <h3>Your new Study Group has been created!</h3>
          <div
            style="width: 50%; margin: 20px auto;"
            class="input-group"
          >
            <input
              type="text"
              ref="inviteDisplay"
              class="form-input"
              placeholder="Invite Code"
              v-model="inviteCode"
            >
            <button
              @click="copyCode"
              class="btn btn-primary input-group-btn"
            >Copy Code</button>
          </div>
          <router-link
            class="btn"
            :to="{name: 'dashboard'}"
          >Dashboard</router-link>
          <!-- this.$router.push({ path: `/${docRef.id}/home` }); -->
          <router-link
            style="margin: 0px 10px;"
            class="btn btn-success"
            :to="{ name: 'home', params: { groupID:newGroupID }}"
          >Go to Group</router-link>
        </div>

        <button
          @click="next"
          class="btn btn-action btn-success btn-lg s-circle"
          :class="active===7 ?'disabled' : '' "
        >
          <i class="icon icon-arrow-right"></i>
        </button>
      </div>

      <el-steps
        :active="active"
        finish-status="success"
        simple
      >
        <el-step
          @click.native="active = 0"
          title="Step 1"
        ></el-step>
        <el-step
          @click.native="active = 1"
          title="Step 2"
        ></el-step>
        <el-step
          @click.native="active = 2"
          title="Step 3"
        ></el-step>
        <el-step
          @click.native="active = 3"
          title="Step 4"
        ></el-step>
        <el-step
          @click.native="active = 4"
          title="Step 5"
        ></el-step>
        <el-step
          @click.native="active = 5"
          title="Step 6"
        ></el-step>
        <el-step
          @click.native="active = 6"
          title="Step 7"
        ></el-step>
        <el-step
          @click.native="active = 7"
          title="Finalize"
        ></el-step>
      </el-steps>

    </div>
  </div>
</template>

<script>
import firebase, { db, FirebaseConsts } from "../firebaseConfig";
import generateCode from "../scripts/generateCode";

export default {
  name: "CreateGroup",
  data() {
    return {
      active: 0,
      className: "",
      instructorName: "",
      location: "",
      hasWebsite: false,
      websiteURL: "",
      hasExtraInfo: false,
      extraInfo: "",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      meetingDays: [],
      meetingTime: [new Date(), new Date()],
      inviteCode: "",
      newGroupID: ""
    };
  },
  methods: {
    next() {
      this.active++;
    },
    back() {
      if (this.active !== 0) {
        this.active--;
      }
    },
    copyCode() {
      // Allows user to copy the invite code on button click
      this.$refs.inviteDisplay.select();
      document.execCommand("copy");
    },
    createStudyGroup() {
      // Generate random invite code and save it
      this.inviteCode = generateCode();
      // Create new study group in the firestore
      db.collection("study-groups")
        .add({
          className: this.className,
          instructorName: this.instructorName,
          meetingDays: this.meetingDays,
          meetingTime: this.meetingTime,
          location: this.location,
          // Check to see if it is just the prepend or the actual url
          websiteURL:
            this.websiteURL === "" ? "" : "https://" + this.websiteURL,
          extraInfo: this.extraInfo,
          owner: firebase.auth().currentUser.uid,
          members: [firebase.auth().currentUser.uid],
          inviteCodes: [this.inviteCode]
        })
        .then(docRef => {
          this.newGroupID = docRef.id;
          this.next();
        })
        .catch(error => {
          console.log("CreateGroup: " + error);
        });
    }
  },
  computed: {
    formattedURL() {
      return "https://" + this.websiteURL;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styleVariables.scss";

button.s-circle {
  margin: 15px;
}

.pageTitle {
  position: fixed;
  width: 100%;
  margin-top: 50px;
  font-family: $logo-font;
  text-shadow: rgba(36, 37, 38, 0.13) 5px 12px 20px;
}

// Main container, centers all content on the page
.createContent {
  min-height: 94vh;
  // background-image: $green-gradient;
  // background-color: #97d9e1;
  // TODO: Figure out good background color
  // background-color: grey;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

// Aligns the card into a row between the two traversal buttons.
.navContainer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.infoContainer {
  padding: 20px;
  min-height: 225px;
  max-width: 800px;
  min-width: 800px;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  // border-radius: 16px;
  box-shadow: 5px 12px 20px rgba(36, 37, 38, 0.13);
}

.createBtn {
  margin-top: 55px;
  background-image: $nav-gradient;
  width: 300px;
  padding: 20px;
  font-family: $logo-font;
  font-size: 30px;
  color: white;
  border-radius: 10px;

  &:hover {
    color: whitesmoke;
    // box-shadow: rgba(36, 37, 38, 0.13) 5px 12px 20px;
  }
}

.el-input {
  margin-top: 15px;
  width: 60%;
}

.el-textarea {
  width: 80%;
}

.el-step {
  cursor: pointer;
}

.arrow-buttons {
  margin: 20px;
}

// .el-switch {
//   padding: 50px;
// }

.buttonContainer {
  display: block;
}
.el-steps {
  // background-color: rgba(0, 0, 0, 0);
  box-shadow: rgba(36, 37, 38, 0.13) 5px 12px 20px;
  position: fixed;
  bottom: 0;
  padding-left: 15px;
  padding-right: 15px;
  margin: 30px auto;
  width: 80%;
}
</style>
