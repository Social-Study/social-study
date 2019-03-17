<template>

  <div class="agenda-form">
    <div class="modal-title h5">{{getTitle}}</div>
    <div class="tile">
      <div class="tile-content text-left">
        <div class="tile-title text-bold">Event Title</div>
        <div class="tile-subtitle">
          <input
            @input="$emit('publish', item);"
            class="form-input"
            v-model="item.title"
            type="text"
            maxlength="50"
          />
        </div>
      </div>
    </div>

    <div class="tile">
      <div class="tile-content text-left">
        <div class="tile-title text-bold">Event Description</div>
        <div class="tile-subtitle">
          <textarea
            @input="$emit('publish', item);"
            class="form-input"
            name="description"
            rows="3"
            style="resize: none;"
            v-model="item.description"
          ></textarea>
        </div>
      </div>
    </div>

    <div class="tile">
      <div class="tile-content text-left">
        <div class="tile-title text-bold">Event Date / Time</div>
        <div class="tile-subtitle date-time-container">
          <!-- Date Picker -->
          <date-picker
            @input="$emit('publish', item);"
            :disabledDates="disabledDates"
            v-model="item.date"
          />
          <!-- :inline="true" -->
          <!-- Time Picker -->
          <vue-timepicker
            @input="$emit('publish', item);"
            v-model="item.time"
            hide-clear-button
            format="hh:mm A"
          ></vue-timepicker>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import DatePicker from "vuejs-datepicker";
import VueTimepicker from "vue2-timepicker";

import { endOfYesterday, getMinutes } from "date-fns";

export default {
  name: "AgendaCreateForm",
  components: {
    DatePicker,
    VueTimepicker
  },
  props: {
    editItem: {
      type: Object,
      required: false
    }
  },
  created() {
    // Transfer all the prop data to the editable data if they are editing an existing event
    if (this.editItem !== null) {
      this.item.title = this.editItem.title;
      this.item.description = this.editItem.description;

      var dateObject = this.editItem.date.toDate();
      this.item.date = dateObject;
      this.item.time.hh = "" + dateObject.getHours();
      // Fucky logic to pass existing minutes to the time picker
      this.item.time.mm =
        getMinutes(this.editItem.date.toDate()) < 10
          ? "0" + getMinutes(this.editItem.date.toDate())
          : getMinutes(this.editItem.date.toDate());
    }
  },
  data() {
    return {
      // Disables all previous dates on the calendar.
      disabledDates: {
        to: endOfYesterday()
      },
      item: {
        title: "",
        description: "",
        date: null,
        time: {
          hh: "12",
          mm: "00",
          ss: "00",
          A: "PM"
        }
      }
    };
  },
  computed: {
    getTitle() {
      if (this.editItem) {
        return "Edit Existing Agenda Item";
      }
      return "Create New Agenda Item";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles.scss";

textarea {
  width: 100%;
}

.date-time-container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
}

.tile-title {
  padding: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  font-family: $secondary-font;
}
</style>
