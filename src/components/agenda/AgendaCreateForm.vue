<template>
  <div class="agenda-form">
    <div class="modal-title h5">{{ getTitle }}</div>
    <div class="tile">
      <div class="tile-content text-left">
        <div class="tile-title text-bold">Event Title</div>
        <div class="tile-subtitle">
          <input
            @input="$emit('publish', item)"
            class="form-input"
            v-model="item.title"
            type="text"
            maxlength="26"
          />
        </div>
      </div>
    </div>

    <div class="tile">
      <div class="tile-content text-left">
        <div class="tile-title text-bold">Event Description</div>
        <div class="tile-subtitle">
          <textarea
            @input="$emit('publish', item)"
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
          <flat-pickr
            @on-change="$emit('publish', item)"
            :config="config"
            v-model="item.date"
          ></flat-pickr>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import "flatpickr/dist/themes/airbnb.css";
import ConfirmDatePlugin from "flatpickr/dist/plugins/confirmDate/confirmDate.js";

import { endOfYesterday, getMinutes } from "date-fns";

export default {
  name: "AgendaCreateForm",
  components: {
    flatPickr
  },
  props: {
    editItem: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      // Disables all previous dates on the calendar.
      config: {
        minDate: Date.now(),
        dateFormat: "Z",
        //  YYYY-MM-DDThh:mmTZD (eg 1997-07-16T19:20+01:00)
        altInput: true,
        altFormat: "F j, Y @ h:i K",
        enableTime: true,
        plugins: [new ConfirmDatePlugin()]
      },
      item: {
        title: "",
        description: "",
        date: null
      }
    };
  },
  created() {
    // Transfer all the prop data to the editable data if they are editing an existing event
    if (this.editItem !== null) {
      this.item.title = this.editItem.title;
      this.item.description = this.editItem.description;

      this.item.date = this.editItem.date.toDate();
      this.config.defaultDate = this.item.date;
    }
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

// .date-time-container {
//   display: flex;
//   flex-flow: row nowrap;
//   justify-content: space-evenly;
// }

.tile-title {
  padding: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  font-family: $secondary-font;
}
</style>
