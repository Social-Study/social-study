<template>
  <!-- Note Icon -->
  <div id="note">
    <!-- Title -->
    <h2 id="title">{{info.title}}</h2>
    <div>
      <!-- Created -->
      <p id="created"><i>Created on</i> {{info.creationDate.toDate().toLocaleDateString()}}</p>
      <!-- Modified -->
      <!-- <p id="modified"><i>Modified:</i> {{info.lastUpdated.toDate().toLocaleDateString()}}</p> -->
      <p id="modified"><i>Modified</i> {{calcDays(info.lastUpdated.toDate())}}</p>
    </div>

    <div id="button-container">
      <button
        @click="deleteNote(info.id)"
        id="deleteBtn"
      >Delete</button>
      <button
        @click="$router.push(`/${$route.params.groupID}/notes/${info.id}`)"
        id="editBtn"
      >Edit</button>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebaseConfig";
import { distanceInWordsToNow } from "date-fns";

export default {
  name: "NoteIcon",
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  methods: {
    deleteNote(id) {
      // TODO: Add some sort of confirmation before deleting
      db.collection("study-groups")
        .doc(this.$route.params.groupID)
        .collection("notes")
        .doc(this.$store.getters.uid)
        .collection("private")
        .doc(id)
        .delete();
    },
    calcDays(date) {
      return distanceInWordsToNow(date) + " ago";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles.scss";

/* Icon itself */
#note {
  background-color: white;
  height: 288px;
  width: 216px;
  padding: 1em;
  box-shadow: 0 6px 15px rgba(36, 37, 38, 0.08);
  border: 2px solid $secondary-light;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    border-image: $orange-gradient;
    border-image-slice: 1;
    box-shadow: $shadow-heavy;
  }
}

#title {
  font-family: $secondary-font;
  font-weight: 700;
  text-overflow: ellipsis;
  overflow: hidden;
  /* white-space: ; */
  max-width: 10em;
  max-height: 5em;
}

#created,
#modified {
  // padding: 0.3em 0 0.3em 0;
  margin: 4px;
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

#button-container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  align-items: center;
}

#deleteBtn {
  cursor: pointer;
  border: none;
  padding: 0.3em;
  background-color: transparent;
  color: lighten($secondary, 30);
  font-weight: 500;
}

#deleteBtn:hover {
  color: hsl(0, 100%, 55%);
}

#editBtn {
  cursor: pointer;
  border: none;
  border-radius: 5px;
  /* padding: 0.3em 0.5em 0.3em 0.5em; */
  padding: 4px 16px 4px 16px;
  background-color: $primary;
  color: white;
  font-weight: 400;
}

#editBtn:hover {
  background-color: lighten($primary, 10);
}
</style>
