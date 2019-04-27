<!-- SCI ID: 034 -->
<!-- Name: FlashcardIcon -->
<!-- Version: 1.0 -->
<template>
  <!-- Flashcard Icon -->
  <div id="flashcard">
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
        id="indicator"
        class="tooltip tooltip-bottom"
        data-tooltip="Toggle Visibility"
        @click="$emit('toggle')"
      >
        <i
          class="far"
          :class="isPrivate ? 'fa-eye-slash' : 'fa-eye'"
        ></i>
      </div>
    </div>
    <!-- title -->
    <span id="title">{{ info.title }}</span>
    <!-- Created -->
    <p id="created">
      <i>Created on</i> {{ info.creationDate.toDate().toLocaleDateString() }}
    </p>
    <!-- Last Updated -->
    <p id="modified">
      <i>Updated</i> {{ calcDays(info.lastUpdated.toDate()) }}
    </p>
    <!-- Color status indicator based on deck rating -->
    <div
      id="status"
      class="tooltip"
      :data-tooltip="'Upvotes: ' + this.info.upvotes.length + ' Downvotes: ' + this.info.downvotes.length"
      :class="determineStatus()"
    ></div>
    <!-- Creator Avatar and Name Chip -->
    <!-- TODO: Figure out how to use my existing avatar component -->
    <div class="chip text-ellipsis">
      <!-- Set background to transparent when there is an image. Fixes fuzzy outline  -->
      <img
        v-if="info.creatorPhoto !== null"
        :src="info.creatorPhoto"
        class="avatar avatar-sm"
      />
      {{ info.creatorName }}
    </div>
    <div
      id="studyBtn"
      @click="goStudy"
    >Study</div>
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
    determineStatus() {
      if (this.info.downvotes.length > this.info.upvotes.length) {
        return "low-rating";
      } else if (this.info.downvotes.length < this.info.upvotes.length) {
        return "high-rating";
      }
    },
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
      return distanceInWordsToNow(date) + " ago";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles.scss";

$card-width: 288px;
$card-height: 230px;

#status {
  width: 80px;
  height: 10px;
  border-radius: 200px;
  background-color: $primary;
  align-self: center;
}

.low-rating {
  background-color: $error-color !important;
}

.high-rating {
  background-color: $success-color !important;
}

/* Icon itself */
#flashcard {
  background-color: white;
  padding-top: 5px;

  min-height: $card-height;
  max-height: $card-height;
  min-width: $card-width;
  max-width: $card-width;
  // padding: 1em;

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
  font-size: 30px;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: $card-width;
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

#button-container {
  text-align: center;
  padding-left: 5px;
  padding-right: 5px;
  height: 10px;
}

#editBtn {
  cursor: pointer;
  float: left;
  border: none;
  background-color: transparent;
  color: lighten($secondary, 30);
  font-weight: 500;

  &:hover {
    // color: $primary;
    color: $success-color;
  }
}

#indicator {
  cursor: pointer;
  float: right;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  align-self: center;
  color: darken(whitesmoke, 20);

  i.fa-eye:hover {
    color: $success-color;
  }

  i.fa-eye-slash:hover {
    color: $error-color;
  }
}

#studyBtn {
  cursor: pointer;
  background-color: $primary;
  width: 100%;
  color: white;
  font-size: 120%;
  text-align: center;
  padding-top: 5px;
  padding-bottom: 5px;
  font-weight: 400;

  &:hover {
    background-color: lighten($primary, 10);
  }
}
</style>
