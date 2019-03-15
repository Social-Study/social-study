// The details of a specific agenda item.

<template>
  <div class="item-detail">
    <!-- <h1>{{ formatDate(selectedItem.date) }}</h1> -->
    <h1 v-if="selectedItem.date !== undefined">
      {{ selectedItem.date.getTime() }}
    </h1>
  </div>
</template>

<script>
import { format } from "date-fns";

export default {
  name: "ItemDetail",
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
