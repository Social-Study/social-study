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
          :key="item.creationDate.toDate().getTime()"
        >
          <agenda-item-date-header
            v-if="showDateHeader(index)"
            :date="item.date.toDate()"
          />
          <!-- :selected="checkSelected(index)" -->
          <agenda-item
            :selected="selectedIndex === index"
            :item="item"
            @itemSelected="handleSelected(index)"
          />
        </div>
      </div>
      <div class="divider-vert"></div>

      <!-- Clicked agenda item's details -->
      <div class="item-detail-container">
        <agenda-item-detail
          v-if="selectedItem"
          :selectedItem="selectedItem"
        />
        <div v-else>
          <!-- TODO: Implement an empty placeholder -->
          <h1>NOTHING SELECTED</h1>
        </div>
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
import { db } from "@/firebaseConfig";

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
      selectedItem: null,
      // List of all agenda item objects
      agendaItems: [],
      selectedIndex: -1
    };
  },
  created() {
    this.$bind(
      "agendaItems",
      db
        .collection("study-groups")
        .doc(this.$route.params.groupID)
        .collection("agenda")
        .orderBy("date", "asc")
    );
  },
  methods: {
    /**
     * Logic to notify the items if they are selected
     * Selected item is set to the agenda item at index
     * The selectedIndex is set to that index.
     */
    handleSelected(index) {
      this.selectedItem = this.agendaItems[index];
      this.selectedIndex = index;
    },
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
          this.agendaItems[index].date.toDate(),
          this.agendaItems[index - 1].date.toDate()
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
      db.collection("study-groups")
        .doc(this.$route.params.groupID)
        .collection("agenda")
        .add({
          title: e.title,
          description: e.description,
          date: eventDate,
          creationDate: new Date()
        })
        .then(() => {
          this.showCreateModal = false;
        });
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
