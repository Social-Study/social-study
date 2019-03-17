// The details of a specific agenda item.

<template>
  <div
    v-if="selectedItem !== null"
    class="item-detail"
  >
    <h1 id="title">
      {{ selectedItem.title }}
    </h1>
    <h3 id="date">{{ formatDate(selectedItem.date.toDate()) }} at
      {{ formatTime(selectedItem.date.toDate()) }}</h3>
    <h3 id="date">{{getRemainingDays(selectedItem.date.toDate())}}</h3>
    <div class="divider"></div>
    <h4 class="text-left">Description:</h4>
    <p id="description">{{ selectedItem.description }} </p>
  </div>
</template>

<script>
import { format, distanceInWordsToNow } from "date-fns";

export default {
  name: "AgendaItemDetail",
  props: {
    selectedItem: {
      type: Object,
      required: false
    }
  },
  methods: {
    getRemainingDays(date) {
      return distanceInWordsToNow(date);
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

#title {
  font-family: $secondary-font;
  font-weight: 700;
}

#date {
  color: $secondary;
}

#description {
  width: 80%;
  margin: auto;
  white-space: pre-line;
  // text-align: left;
  text-align: justify;
}
</style>
