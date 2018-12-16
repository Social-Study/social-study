<template>
  <div>
    <h1 class="pageTitle">Create a New Study Group</h1>
    <div class="createContent">

      <!-- Contains Center Content; Buttons and Content -->
      <div class="navContainer">
        <button
          @click="back"
          class="btn btn-action btn-success btn-lg s-circle"
          :class="active===0 ?'disabled c-not-allowed' : '' "
        >
          <i class="icon icon-arrow-left"></i>
        </button>

        <!-- Class Name Form -->
        <div
          v-if="active===0"
          class="infoContainer"
        >
          <h2>What is the name of the class?</h2>
          <input
            @keydown.enter.native="next"
            class="form-input"
            type="text"
            v-model="className"
            placeholder="Class Name"
          >
        </div>

        <!-- Instructor Name Form -->
        <div
          class="infoContainer"
          v-else-if="active===1"
        >
          <h2>What is the course intructor's name?</h2>
          <input
            @keydown.enter.native="next"
            class="form-input"
            type="text"
            v-model="instructorName"
            placeholder="Instructor Name"
          >
        </div>

        <!-- Class Meeting Time Form -->
        <div
          class="infoContainer"
          v-else-if="active===2"
        >
          <h2>When does your class meet?</h2>

          <div class="btn-group btn-group-block">
            <button
              @click="toggle('monday')"
              :class="meetingDays.monday ? 'active':''"
              class="btn"
            >Monday</button>
            <button
              @click="toggle('tuesday')"
              :class="meetingDays.tuesday ? 'active':''"
              class="btn"
            >Tuesday</button>
            <button
              @click="toggle('wednesday')"
              :class="meetingDays.wednesday ? 'active':''"
              class="btn"
            >Wednesday</button>
            <button
              @click="toggle('thursday')"
              :class="meetingDays.thursday ? 'active':''"
              class="btn"
            >Thursday</button>
            <button
              @click="toggle('friday')"
              :class="meetingDays.friday ? 'active':''"
              class="btn"
            >Friday</button>
          </div>

          <br>
          <div class="time-group">

            <input
              type="time"
              class="time-picker form-input"
              v-model="meetingTime[0]"
            >
            <input
              type="time"
              class="time-picker form-input"
              v-model="meetingTime[1]"
            >
          </div>
        </div>

        <!-- Class Meeting Location Form -->
        <div
          class="infoContainer"
          v-else-if="active===3"
        >
          <h2>Where does the class meet?</h2>

          <input
            @keydown.enter.native="next"
            class="form-input"
            type="text"
            v-model="location"
            placeholder="Class Location"
          >
        </div>

        <!-- Instructor Website Form -->
        <div
          class="infoContainer"
          v-else-if="active===4"
        >
          <h2>Does your instructor have a website?</h2>

          <div class="form-group switch">
            <label class="form-switch">
              <input
                type="checkbox"
                v-model="hasWebsite"
              >
              <i class="form-icon"></i>
            </label>
          </div>
          <br>
          <transition-group
            name="transition"
            enter-active-class="animated fadeInDown"
            leave-active-class="animated fadeOutUp"
          >

            <div
              v-show="hasWebsite"
              key="input"
              class="input-group"
            >
              <span class="input-group-addon">https://</span>
              <input
                @keydown.enter.native="next"
                style="margin: 0;"
                class="form-input"
                type="text"
                v-model="websiteURL"
                placeholder="Website URL"
              >
            </div>

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

        <!-- Extra Group Info Form -->
        <div
          class="infoContainer"
          v-else-if="active===5"
        >
          <h2>Would you like to enter any additional information?</h2>
          <div class="form-group switch">
            <label class="form-switch">
              <input
                type="checkbox"
                v-model="hasExtraInfo"
              >
              <i class="form-icon"></i>
            </label>
          </div>
          <br>
          <div
            v-show="hasExtraInfo"
            key="input"
            class="input-group"
          >
            <transition
              name="transition"
              enter-active-class="animated fadeInDown"
              leave-active-class="animated fadeOutUp"
            >
              <textarea
                v-show="hasExtraInfo"
                @keydown.enter.native="next"
                style="resize: none"
                class="form-input"
                type="text-area"
                v-model="extraInfo"
                cols="53"
                rows="3"
                placeholder="Additional Class Info"
              ></textarea>
            </transition>
          </div>
        </div>

        <!-- Create Group with previous data confirmation -->
        <div
          class="infoContainer"
          v-else-if="active===6"
        >
          <button
            @click="createStudyGroup"
            class="createBtn"
          >
            Create Study Group
          </button>
        </div>

        <!-- Invite Code / New Group Links -->
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
              style="margin: 0;"
            >
            <button
              @click="copyCode"
              class="btn btn-primary input-group-btn"
            >Copy Code</button>
          </div>
          <div id="btnContainer">

            <router-link
              class="btn"
              :to="{name: 'dashboard'}"
            >Dashboard</router-link>
            <router-link
              style="margin: 0px 10px;"
              class="btn btn-success"
              :to="{ name: 'home', params: { groupID:newGroupID }}"
            >Go to Group</router-link>
          </div>
        </div>

        <!-- Next Button -->
        <button
          @click="next"
          class="btn btn-action btn-success btn-lg s-circle"
          :class="active===7 ?'disabled' : '' "
        >
          <i class="icon icon-arrow-right"></i>
        </button>
      </div>

      <!-- Bottom Of Page Steps Indicator -->
      <ul class="step">
        <li
          :class="active === 0 ? 'active' : ''"
          class="step-item"
        >
          <a
            class="tooltip"
            data-tooltip="Group Name"
          >Step 1</a>
        </li>
        <li
          :class="active === 1 ? 'active' : ''"
          class="step-item"
        >
          <a
            class="tooltip"
            data-tooltip="Instructor's Name"
          >Step 2</a>
        </li>
        <li
          :class="active === 2 ? 'active' : ''"
          class="step-item"
        >
          <a
            class="tooltip"
            data-tooltip="Meeting Times"
          >Step 3</a>
        </li>
        <li
          :class="active === 3 ? 'active' : ''"
          class="step-item"
        >
          <a
            class="tooltip"
            data-tooltip="Meeting Location"
          >Step 4</a>
        </li>
        <li
          :class="active === 4 ? 'active' : ''"
          class="step-item"
        >
          <a
            class="tooltip"
            data-tooltip="Instructor Website"
          >Step 5</a>
        </li>
        <li
          :class="active === 5 ? 'active' : ''"
          class="step-item"
        >
          <a
            class="tooltip"
            data-tooltip="Additional Information"
          >Step 6</a>
        </li>
        <li
          :class="active === 6 ? 'active' : ''"
          class="step-item"
        >
          <a
            class="tooltip"
            data-tooltip="Confirm Creation"
          >Step 7</a>
        </li>
        <li
          :class="active === 7 ? 'active' : ''"
          class="step-item"
        >
          <a
            class="tooltip"
            data-tooltip="Success"
          >Done</a>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import firebase, { db, FirebaseConsts } from "../firebaseConfig";
import generateCode from "../scripts/generateCode";

export default {
  name: "CreateGroup",
  // TODO: Convert the containers to be flexbox...
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
      meetingDays: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false
      },
      meetingTime: [new Date(), new Date()],
      inviteCode: "",
      newGroupID: ""
    };
  },
  methods: {
    toggle(key) {
      this.meetingDays[key] = !this.meetingDays[key];
    },
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
      // FIXME: Parse only true days from the meetingDays object, and save them into array
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 20px;
  min-height: 400px;
  max-width: 800px;
  min-width: 800px;
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
  // border-radius: 16px;
  box-shadow: 5px 12px 20px rgba(36, 37, 38, 0.13);
}

.createBtn {
  cursor: pointer;
  background-image: $nav-gradient;
  width: 300px;
  padding: 20px;
  font-family: $logo-font;
  font-size: 30px;
  color: white;
  border-radius: 16px;
  border: 0;

  &:hover {
    color: lightgrey;
    box-shadow: $shadow-heavy;
  }
}

.time-group {
  display: block;
}

.time-picker {
  width: 140px;
}

input {
  margin-top: 15px;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
}

textarea {
  width: 60%;
}

.arrow-buttons {
  margin: 20px;
}

.blocked {
  cursor: not-allowed !important;
}

.switch {
  margin: 0 auto 20px auto;
  width: 50px;
}

.step {
  box-shadow: $shadow;
  position: fixed;
  bottom: 0;
  padding: 5px 10px;
  margin: 30px auto;
  width: 80%;
  border-radius: 10px;
}
</style>
