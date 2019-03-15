<template>

  <!-- Create new item modal -->
  <div class="modal active">
    <a
      href="#close"
      @click="$emit('close')"
      class="modal-overlay"
      aria-label="Close"
    >
    </a>
    <div class="modal-container">
      <div class="modal-header">
        <a
          @click="$emit('close')"
          href="#close"
          id="close"
          class="float-right"
          aria-label="Close"
        >
          <i class="fas fa-times"></i>
        </a>
        <div class="modal-title h5">Create New Agenda Item</div>
      </div>
      <div
        class="modal-body"
        ref="body"
      >
        <div class="content">
          <div class="tile">
            <div class="tile-content text-left">
              <div class="tile-title text-bold">Event Title</div>
              <div class="tile-subtitle">
                <input
                  class="form-input"
                  v-model="title"
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
                  class="form-input"
                  name="description"
                  rows="3"
                  style="resize: none;"
                  v-model="description"
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
                  v-model="date"
                  :inline="true"
                />
                <!-- Time Picker -->
                <vue-timepicker
                  v-model="time"
                  hide-clear-button
                  format="hh:mm A"
                ></vue-timepicker>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button
          @click="publishData"
          class="btn btn-primary"
          :class="!validInfoEntered ? 'disabled': ''"
        >
          Publish Item
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from "vuejs-datepicker";
import VueTimepicker from "vue2-timepicker";

export default {
  name: "AgendaCreateModal",
  components: {
    DatePicker,
    VueTimepicker
  },
  data() {
    return {
      title: "",
      description: "",
      date: null,
      time: {
        hh: "12",
        mm: "00",
        ss: "00"
      }
    };
  },
  methods: {
    publishData() {
      this.$emit("publish", {
        title: this.title,
        description: this.description,
        date: this.date,
        time: this.time
      });
      this.title = "";
      this.description = "";
      this.date = null;
      this.time = {
        hh: "12",
        mm: "00",
        ss: "00"
      };
    }
  },
  computed: {
    validInfoEntered() {
      if (this.title !== "" && this.description !== "" && this.date !== null) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles.scss";

// TODO: Create some sort of modal component so the look is unified
.modal-container {
  #close {
    color: $secondary;
    i {
      font-size: 24px;
    }
    &:hover {
      color: darken($secondary, 5);
    }
    &:focus {
      outline: none;
    }
  }
}

textarea {
  width: 100%;
}

.modal-body {
  // overflow: scroll !important;
  min-height: 580px;
}

.date-time-container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
}

.modal-header {
  margin: 15px 15px 0 15px;
}

.modal-title {
  font-family: $secondary-font;
  font-weight: 700;
}

.tile-title {
  // padding: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  font-family: $secondary-font;
}
</style>
