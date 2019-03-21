<template>
  <!-- Note Icon -->
  <div id="note">
    <span class="icon icon-delete" id="deleteBtn" @click="deleteNote(info.id)"></span>
    <!-- Title -->
    <h2 id="title">{{ info.title }}</h2>
    <div>
      <!-- Created -->
      <p id="created">
        <i>Created on</i> {{ info.creationDate.toDate().toLocaleDateString() }}
      </p>
      <!-- Modified -->
      <!-- <p id="modified"><i>Modified:</i> {{info.lastUpdated.toDate().toLocaleDateString()}}</p> -->
      <p id="modified">
        <i>Modified</i> {{ calcDays(info.lastUpdated.toDate()) }}
      </p>
    </div>
      <button
        id="editBtn"
        @click="$router.push(`/${$route.params.groupID}/notes/${info.id}`)"
      >
        Open
      </button>
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
  box-shadow: 0 6px 15px rgba(36, 37, 38, 0.08);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    box-shadow: $shadow-hovered;
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

#deleteBtn {
  float:left;
  padding: 10px;
  margin: 15px;
  cursor: pointer;
  background-color: transparent;
  width: 10px;
  color: $secondary-light;
  font-weight: 500;
}

#deleteBtn:hover {
  color: hsl(0, 100%, 55%);
}

#editBtn {
  cursor: pointer;
  border: none;
  /* padding: 0.3em 0.5em 0.3em 0.5em; */
  width: 100%;
  background-color: $primary;
  color: white;
  font-size: 120%;
  font-weight: 400;
}

#editBtn:hover {
  background-color: lighten($primary, 10);
}
</style>
