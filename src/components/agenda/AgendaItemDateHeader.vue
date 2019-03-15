<template>
  <div class="date-header">
    {{ dateHeader(date) }}
  </div>
</template>

<script>
import { format } from "date-fns";

export default {
  name: "AgendaItemDateHeader",
  props: {
    date: {
      type: Date,
      required: true
    }
  },
  methods: {
    /**
     * Outputs formated date string for the item list headers
     */
    dateHeader(date) {
      return format(date, "dddd, MMMM Mo");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles.scss";

.date-header {
  background-color: $secondary-light;
  font-size: 1em;
  width: 200px;
  margin: 0 0 10px 0;
  border-radius: 5px;
  color: white;
}
</style>
