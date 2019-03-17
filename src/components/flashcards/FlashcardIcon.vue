<template>
  <!-- Flashcard Icon -->
  <div id="flashcard">
    <!-- Title -->
    <h2 id="title">{{ info.title }}</h2>
    <!-- Created -->
    <p id="created">
      <i>Created on</i> {{ info.creationDate.toDate().toLocaleDateString() }}
    </p>
    <!-- Last Updated -->
    <p id="modified">
      <i>Updated</i> {{ calcDays(info.lastUpdated.toDate()) }}
    </p>
    <!-- Creator Avatar and Name Chip -->
    <!-- TODO: Figure out how to use my existing avatar component -->
    <div class="chip text-ellipsis">
      <!-- Set background to transparent when there is an image. Fixes fuzzy outline  -->
      <img
        :src="info.creatorPhoto"
        class="avatar avatar-sm"
        :class="info.creatorPhoto !== '' ? 'chip-transp' : ''"
      />
      {{ info.creatorName }}
    </div>
    <!-- Edit and Study Buttons -->
    <div id="button-container">
      <!-- Edit only shows if you are the deck creator -->
      <button
        v-if="$store.getters.uid === info.creatorUID"
        id="editBtn"
        @click="
          $router.push({
            name: 'editFlashcards',
            params: { deckID: info.id, isPrivate: isPrivate }
          })
        "
      >
        Edit
      </button>
      <div
        v-if="info.creatorUID === $store.getters.uid"
        @click="$emit('toggle')"
        id="indicator"
        class="tooltip tooltip-bottom"
        data-tooltip="Toggle Visibility"
      >
        <i class="far" :class="isPrivate ? 'fa-eye-slash' : 'fa-eye'"></i>
      </div>
      <button @click="goStudy" id="studyBtn">Study</button>
    </div>
  </div>
</template>

<script>
import { distanceInWordsToNow } from "date-fns";

export default {
  name: "FlashcardIcon",
  props: {
    info: {
      type: Object,
      required: true
    },
    isPrivate: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goStudy() {
      if (this.isPrivate) {
        this.$router.push({
          name: "study",
          params: { deckID: this.info.id, isPrivate: this.isPrivate }
        });
      } else {
        this.$router.push({ name: "study", params: { deckID: this.info.id } });
      }
    },
    calcDays(date) {
      // Old manual date calculations

      // let currentDate = new Date();
      // modDate = new Date(modDate);
      // if (currentDate.toDateString() === modDate.toDateString()) {
      //   return "today";
      // }
      // let timeDiff = Math.abs(currentDate.getTime() - modDate.getTime());
      // let days = Math.ceil(timeDiff / (1000 * 3600 * 24));
      // let retString = days > 1 ? days + " days ago" : days + " day ago";
      // return retString;
      return distanceInWordsToNow(date) + " ago";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles.scss";

$card-width: 288px;
$card-height: 218px;

/* Icon itself */
#flashcard {
  background-color: white;
  height: $card-height;
  width: $card-width;
  padding: 1em;
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

#indicator {
  cursor: pointer;
  position: relative;
  display: inline-block;

  top: 0px;
  left: 0px;

  margin: 5px;
  height: 30px;
  width: 30px;
  padding: 5px;
  border-radius: 50%;
  background-color: whitesmoke;
  align-self: center;

  &:hover {
    background-color: darken(whitesmoke, 20);
  }

  i.fa-eye {
    color: $success-color;
  }

  i.fa-eye-slash {
    color: $error-color;
  }
}

#title {
  font-family: $secondary-font;
  font-weight: 700;
  white-space: nowrap;
  margin: 0;
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
  margin: 0 auto;
  text-align: center;
}

.chip-transp {
  background-color: transparent;
}

#button-container {
  align-self: space-between;
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
