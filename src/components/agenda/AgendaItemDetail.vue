// The details of a specific agenda item.

<template>
  <div
    v-if="selectedItem !== null"
    class="item-detail"
  >
    <!-- <h1>{{ formatDate(selectedItem.date) }}</h1> -->
    <h1>
      {{ selectedItem.title }}
    </h1>
    <h2>{{ formatDate(selectedItem.date.toDate()) }}</h2>
    <h3>{{ selectedItem.description }} </h3>
    <p class="text-gray">Details display design is still a WIP</p>
  </div>
</template>

<script>
import { format } from "date-fns";

export default {
  name: "AgendaItemDetail",
  props: {
    selectedItem: {
      type: Object,
      required: false
    }
  },
  methods: {
    formatDate(date) {
      return format(date, "MM/DD/YYYY");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
