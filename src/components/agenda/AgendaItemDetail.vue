// The details of a specific agenda item.
<!-- SCI ID: 039 -->
<!-- Name: AgendaItemDetail -->
<!-- Version: 1.0 -->
<template>
  <div
    v-if="selectedItem !== null"
    class="item-detail"
  >
    <div id="title-container">
      <h1 id="title">
        {{ selectedItem.title }}
      </h1>
      <div id="user-container">
        <!-- <Avatar :user="{ photoURL: selectedItem.creatorPhoto,
       displayName: selectedItem.creatorName}"></Avatar> -->
        <h3><i>Posted By: </i>{{ selectedItem.creatorName }}</h3>
      </div>
    </div>
    <div id="date-container">
      <h3 id="date">
        <i>Date: </i>{{ formatDate(selectedItem.date.toDate()) }}
      </h3>
      <h3 id="date">
        <i>Time: </i>{{ formatTime(selectedItem.date.toDate()) }}
      </h3>
      <h3 id="date">{{ getRemainingDays(selectedItem.date.toDate()) }}</h3>
    </div>

    <div class="divider"></div>
    <h4 class="text-left">Description:</h4>
    <p id="description">{{ selectedItem.description }}</p>
  </div>
</template>

<script>
import { format, distanceInWordsToNow } from "date-fns";

export default {
  name: "AgendaItemDetail",
  props: {
    selectedItem: {
      type: Object,
      required: false,
      default: null
    }
  },
  methods: {
    getRemainingDays(date) {
      return distanceInWordsToNow(date, { addSuffix: true });
    },
    formatDate(date) {
      return format(date, "M/DD/YYYY");
    },
    formatTime(date) {
      return format(date, "h:mm A");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles.scss";

.item-detail {
  background-color: white;
  padding: 1em;
  margin-bottom: 20px;
  box-shadow: $shadow-hovered;
}

#title-container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  #title {
    font-family: $secondary-font;
    font-weight: 700;
  }
  #user-container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    align-items: center;
    align-self: flex-start;

    h3 {
      i {
        font-style: normal;
        color: $secondary-light;
      }
      margin: 0;
      font-size: 1.1em;
    }
  }
}

#date-container {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-start;

  #date {
    i {
      font-style: normal;
      color: $secondary-light;
    }
    color: $secondary;
    font-size: 1.1em;
  }
}

#description {
  width: 80%;
  margin: auto;
  white-space: pre-line;
  text-align: justify;
}
</style>
