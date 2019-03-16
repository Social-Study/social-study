// The individual agenda item card.

<template>
  <div>
    <div
      class="agenda-item"
      @click="$emit('itemSelected')"
      :class="checkSelected(item.creationDate) ? 'selected':''"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<script>
import { isEqual } from "date-fns";

export default {
  name: "AgendaItemDetail",
  props: {
    item: {
      type: Object,
      required: true
    },
    selectedItem: {
      type: Object,
      required: false
    },
    index: {
      type: Number,
      required: true
    }
  },
  methods: {
    /**
     * Check if the selectedDate is the same as the given date parameter
     *
     * Returns true if equal. False otherwise
     */
    checkSelected(date) {
      if (this.selectedItem !== undefined) {
        return isEqual(this.selectedItem.creationDate.toDate(), date.toDate());
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles.scss";

.agenda-item {
  cursor: pointer;
  border: 2px solid $secondary-light;
  height: 80px;
  margin-bottom: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover,
  &.selected {
    border-image: $orange-gradient;
    border-image-slice: 1;
    border-width: 2px;
    box-shadow: $shadow-hovered;
  }
}
</style>
