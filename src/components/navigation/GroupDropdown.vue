<template>
  <!-- Study Group Switcher -->
  <div v-if="studyGroups.length > 0" class="dropdown">
    <a
      id="group-button"
      class="group-dropdown-button btn btn-primary dropdown-toggle"
      tabindex="0"
    >
      Study Groups <i class="fas fa-caret-down"></i>
    </a>

    <!-- Your Study Group List Dropdown Items -->
    <ul class="menu group-menu">
      <div v-for="(group, index) in studyGroups" :key="index">
        <li>
          <div
            class="group-card"
            :class="group.id == $route.params.groupID ? 'current-group' : ''"
          >
            <router-link
              class="card-text "
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
                {{ getAbrev(group.meetingDays) }} @
                {{ getTime(group.meetingTime[0]) }}-{{
                  getTime(group.meetingTime[1])
                }}
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
  font-family: $secondary-font;
}

#instructorText {
  color: transparent;
  font-size: 0;
  transition: font-size 0.1s, color 0.1s;
  transition-timing-function: ease-in;
}

.group-menu {
  background: transparent;
  background-color: $transparent-dark;
  box-shadow: $shadow-heavy;
  max-width: 250px;
  min-width: 250px;
  margin-top: 4px;
  padding-top: 0;
}

.group-card {
  width: 100%;
  max-width: 250px;
  padding: 5px;
  background-color: white;
  border: solid 2px white;
  transition: padding-top 0.1s, padding-bottom 0.1s;
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  &:hover {
    padding-top: 5%;
    padding-bottom: 5%;

    #instructorText {
      font-size: 15px;
      color: $dark;
    }
  }
  a {
    text-decoration: none;
  }
}

.current-group {
  background-image: $orange-gradient;
  border: none;

  p {
    color: white;
  }
}

.card-text {
  user-select: none;
  margin: 0;
  color: $secondary;
}
#group-button {
  background-color: $transparent-dark;
  color: white;
  border: solid 2px $primary;

  &:hover {
    background-color: white;
    color: $primary;
  }
}
</style>
