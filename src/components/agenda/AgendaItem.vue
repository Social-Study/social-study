// The individual agenda item card.

<template>
  <div>
    <div
      class="agenda-item"
      @click="$emit('itemSelected')"
      :class="{selected}"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<script>
import { isEqual } from "date-fns";

export default {
  name: "AgendaItem",
  props: {
    item: {
      type: Object,
      required: true
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isSelected: false
    };
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
