// The individual agenda item card.
<!-- SCI ID: 041 -->
<!-- Name: AgendaItem -->
<!-- Version: 1.0 -->
<template>
  <div>
    <!-- :style="getBorderColor" -->
    <div
      class="agenda-item"
      :class="{ selected }"
      @click="$emit('itemSelected')"
    >
      <h3>{{ item.title }}</h3>
      <p id="days">{{ getRemainingDays(item.date.toDate()) }}</p>
    </div>
  </div>
</template>

<script>
import {
  isPast,
  distanceInWordsToNow,
  differenceInCalendarDays
} from "date-fns";

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
      isSelected: false,
      borderColors: {
        close: "#cf4545",
        medium: "#32b643",
        far: "#dadee4"
      }
    };
  },
  computed: {
    /**
     * Change the item's border color based on its distance in the future
     *
     * DISABLED FOR NOW - the styling looks too busy with this feature enabled
     */
    getBorderColor() {
      let color = null;

      let remainingDays = differenceInCalendarDays(
        this.item.date.toDate(),
        Date.now()
      );
      if (remainingDays < 7) {
        color = this.borderColors.close;
      } else if (remainingDays > 7 && remainingDays <= 14) {
        color = this.borderColors.medium;
      } else {
        color = this.borderColors.far;
      }
      return {
        borderColor: "" + color
      };
    }
  },
  methods: {
    getRemainingDays(date) {
      if (isPast(date)) {
        return distanceInWordsToNow(date) + " ago";
      }
      return distanceInWordsToNow(date);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles.scss";

.agenda-item {
  cursor: pointer;
  height: 80px;
  margin-bottom: 20px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background-color: white;
  font-family: $secondary-font;

  #days {
    color: $secondary-light;
  }

  h3,
  p {
    padding: 0;
    margin: 0;
  }

  h3 {
    font-size: 1.3em;

    &.selected {
      color: $dark;
    }
  }

  p {
    font-family: $primary-font;
  }

  &:hover {
    box-shadow: $shadow-hovered;
  }
  &.selected {
    background-image: $orange-gradient;
    color: white;
    box-shadow: $shadow-heavy;

    h3 {
      font-weight: 700;
    }

    #days {
      color: $dark;
    }
  }
}
</style>
