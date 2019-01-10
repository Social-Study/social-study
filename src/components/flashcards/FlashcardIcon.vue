<template>
  <!-- Flashcard Icon -->
  <div id="flashcard">

    <!-- Title -->
    <h2 id="title">{{info.title}}</h2>
    <!-- Created -->
    <p id="created"><i>Created:</i> {{info.creationDate.toDate().toLocaleDateString()}}</p>
    <!-- Last Updated -->
    <!-- <p id="modified"><i>Updated:</i> {{info.lastUpdated.toDate().toLocaleDateString()}}</p> -->
    <p id="modified"><i>Updated</i> {{calcDays(info.lastUpdated.toDate())}}</p>
    <!-- Creator Avatar and Name Chip -->
    <!-- TODO: Figure out how to use my existing avatar component -->
    <div class="chip text-ellipsis">
      <img
        :src="info.creatorPhoto"
        class="avatar avatar-sm"
      >
      {{info.creatorName}}
    </div>
    <!-- Edit and Study Buttons -->
    <div id="button-container">
      <!-- Edit only shows if you are the deck creator -->
      <button
        v-if="$store.getters.uid === info.creatorUID"
        id="editBtn"
      >Edit</button>
      <button
        @click="$router.push(`/${$route.params.groupID}/flashcards/${info.id}/study`)"
        id="studyBtn"
      >Study</button>
    </div>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar";

export default {
  name: "FlashcardIcon",
  components: {
    Avatar
  },
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  methods: {
    calcDays(modDate) {
      let currentDate = new Date();
      modDate = new Date(modDate);
      if (currentDate.toDateString() === modDate.toDateString()) {
        return "today";
      }
      let timeDiff = Math.abs(currentDate.getTime() - modDate.getTime());
      let days = Math.ceil(timeDiff / (1000 * 3600 * 24));
      let retString = days > 1 ? days + " days ago" : days + " day ago";
      return retString;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styleVariables.scss";

$card-width: 288px;
$card-height: 218px;

/* Icon itself */
#flashcard {
  background-color: white;
  height: $card-height;
  width: $card-width;
  padding: 1em;
  border-radius: 10px;
  box-shadow: 0 6px 15px rgba(36, 37, 38, 0.08);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#title {
  font-family: "Montserrat";
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: $card-width;
  max-height: 100px;
  text-align: center;
}

#created,
#modified {
  // padding: 0.3em 0 0.3em 0;
  margin-bottom: 4px;
  text-align: center;
  color: $secondary;
  font-size: 0.8em;
  font-weight: 500;
}

p > i {
  color: $secondary-light;
  font-style: normal;
  font-weight: 400;
}

.chip {
  padding: 15px;
  margin: auto;
  text-align: center;
}

#button-container {
  margin-top: 8px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  align-items: center;
}

#editBtn {
  cursor: pointer;
  border: none;
  padding: 0.3em;
  background-color: transparent;
  color: lighten($secondary, 30);
  font-weight: 500;
}

#editBtn:hover {
  // color: $primary;
  color: $success-color;
}

#studyBtn {
  cursor: pointer;
  border: none;
  border-radius: 5px;
  padding: 4px 8px 4px 8px;
  background-color: $primary;
  color: white;
  font-weight: 400;
}

#studyBtn:hover {
  /* color: hsl(0, 0%, 85%); */
  background-color: lighten($primary, 10);
}
</style>
