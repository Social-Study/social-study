<template>
  <!-- Study Group Switcher -->
  <div
    v-if="studyGroups.length > 0"
    class="dropdown"
  >
    <a
      class="group-dropdown-button btn btn-primary dropdown-toggle"
      tabindex="0"
    >
      Study Groups <i class="fas fa-caret-down"></i>
    </a>

    <!-- Your Study Group List Dropdown Items -->
    <ul class="menu group-menu">
      <div
        v-for="(group, index) in studyGroups"
        :key="index"
      >
        <li>
          <div class="group-card">
            <router-link
              class="card-text"
              :to="{ name: 'home', params: { groupID: group.id } }"
            >
              <p
                id="groupNameText"
                class="card-text text-ellipsis text-bold text-large"
              >
                {{ group.className }}
              </p>
              <p
                id="instructorText"
                class="card-text text-ellipsis text-italic"
              >
                {{ group.instructorName }}
              </p>
              <p class="card-text text-ellipsis text-center">
                {{ getAbrev(group.meetingDays) }} @ {{ getTime(group.meetingTime[0])}}-{{ getTime(group.meetingTime[1]) }}
              </p>
            </router-link>
          </div>
        </li>
      </div>
    </ul>
  </div>

</template>

<script>
export default {
  name: "GroupDropdown",
  props: {
    studyGroups: {
      type: Array,
      required: true
    }
  },
  methods: {
    getTime(time) {
      try {
        let hour = parseInt(time.split(":")[0]);
        let minutes = time.split(":")[1];
        return ((hour + 11) % 12) + 1 + ":" + minutes;
      } catch (err) {
        // console.log(err);
      }
    },
    getAbrev(days) {
      let string = "";
      days.forEach(day => {
        if (day === "Thursday") {
          string += day.slice(0, 2) + " ";
        } else {
          string += day.charAt(0).toUpperCase();
        }
      });
      return string;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles.scss";

#groupNameText {
  font-family: "Montserrat", sans-serif;
}

#instructorText {
  color: $secondary-light;
}

.group-dropdown-button {
  width: 250px;
  margin-right: 20px;
}

.group-menu {
  background-color: $secondary-light;
  box-shadow: $shadow-heavy;
  max-width: 250px;
  min-width: 250px;
}

.group-card {
  width: 100%;
  max-width: 250px;
  padding: 5px;
  border-radius: 10px;
  background-color: white;
  box-shadow: $shadow;

  &:hover {
    background-color: $dark;
    p {
      color: white;
    }
  }

  a {
    text-decoration: none;
  }
}

.card-text {
  user-select: none;
  margin: 0;
  color: $main-gray;
}
</style>
