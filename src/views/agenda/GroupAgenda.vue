<template>
  <div>
    <page-title>
      <template slot="left">
        <button
          class="btn btn-primary"
          @click="showCreateModal = true"
        >Add Item <i class="fas fa-plus"></i>
        </button>
      </template>
      <template slot="center">
        Group Agenda
      </template>
    </page-title>

    <!-- Modal Component -->
    <agenda-create-modal
      v-if="showCreateModal"
      @close="showCreateModal = false"
      @publish="createItem"
    />

    <div class="content-container">
      <!-- List of all agenda items -->
      <div class="item-list">
        <div
          v-for="(item, index) in agendaItems"
          :key="item.date.getTime()"
        >
          <agenda-item-date-header
            v-if="showDateHeader(index)"
            :date="item.date"
          />
          <agenda-item
            :item="item"
            @itemSelected="selectedItem = item"
            :selected-item="selectedItem"
            :index="index"
          />
        </div>
      </div>
      <div class="divider-vert"></div>

      <!-- Clicked agenda item's details -->
      <div class="item-detail-container">
        <agenda-item-detail
          v-if="selectedItem !== {}"
          :selectedItem="selectedItem"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/navigation/PageTitle";
import AgendaItem from "@/components/agenda/AgendaItem";
import AgendaItemDateHeader from "@/components/agenda/AgendaItemDateHeader";
import AgendaItemDetail from "@/components/agenda/AgendaItemDetail";
import AgendaCreateModal from "@/components/agenda/AgendaCreateModal";

import { format, isSameDay, setHours, setMinutes } from "date-fns";

export default {
  name: "GroupAgenda",
  components: {
    PageTitle,
    AgendaItem,
    AgendaItemDateHeader,
    AgendaItemDetail,
    AgendaCreateModal
  },
  data() {
    return {
      // Only shown when the create new button is pressed
      showCreateModal: false,
      // Object that is clicked on (focused)
      selectedItem: {},
      // List of all agenda item objects
      agendaItems: [],
      // New event object details
      newEvent: {
        title: "",
        description: "",
        date: null,
        time: {
          HH: "12",
          mm: "00",
          ss: "00"
        }
      }
    };
  },
  created() {
    // Sort all loaded agenda items on create
    this.sortItems();
  },
  methods: {
    /**
     * Determine if the previous agenda item has the same date as the current
     * index item. (3/15/19 === 3/15/19)
     *
     * This is used to conditionally show the date header only when the dates
     * are different. There will be blocks of items using the same header.
     */
    showDateHeader(index) {
      if (index !== 0) {
        return !isSameDay(
          this.agendaItems[index].date,
          this.agendaItems[index - 1].date
        );
      } else {
        // The first item will always show the header.
        return true;
      }
    },
    /**
     * Create a new agenda item. Each agenda item contains the following:
     *
     * Title
     * Description
     * Date/Time
     *
     */
    createItem(e) {
      console.log(e);
      let eventDate = e.date;
      eventDate = setHours(eventDate, e.time.hh);
      eventDate = setMinutes(eventDate, e.time.mm);

      console.log(eventDate.toString());
      this.showCreateModal = false;
    },
    /**
     * Compare two agenda objects by their date value
     */
    compare(a, b) {
      if (a.date > b.date) {
        return 1;
      } else if (a.date < b.date) {
        return -1;
      }
      return 0;
    },
    /**
     * Sort all agenda items using the custom implemented compare function
     */
    sortItems() {
      // console.log(this.agendaItems.sort(this.compare));
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles.scss";

.content-container {
  height: $page-with-header-height;
  display: flex;
  flex-flow: row nowrap;
}

.item-list {
  height: 100%;
  padding: 20px;
  overflow: auto;
  flex: 1;
}

.item-detail-container {
  padding: 20px;
  height: 100%;
  flex: 3;
}

.divider-vert {
  padding: 0;
}
</style>
