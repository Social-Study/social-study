<template>
  <div>
    <page-title>
      <template slot="center">
        Group Agenda
      </template>
    </page-title>
    <div class="content-container">

      <div class="item-list">
        <div class="date-header">
          Thursday, March 14
        </div>
        <div
          v-for="item in agendaItems"
          :key="item.title"
          class="agenda-item"
        >
          {{item.title}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/navigation/PageTitle";

export default {
  name: "GroupAgenda",
  components: {
    PageTitle
  },
  data() {
    return {
      agendaItems: [
        {
          title: "Agenda Item 4",
          value: 10
        },
        {
          title: "Agenda Item 1",
          value: 4
        },
        {
          title: "Agenda Item 1",
          value: 4
        },
        {
          title: "Agenda Item 1",
          value: 100
        },
        {
          title: "Agenda Item 1",
          value: 4
        },
        {
          title: "Agenda Item 1",
          value: 4
        },
        {
          title: "Agenda Item 1",
          value: 4
        },
        {
          title: "Agenda Item 3",
          value: 6
        },
        {
          title: "Agenda Item 2",
          value: 5
        }
      ]
    };
  },
  created() {
    this.sortItems();
  },
  methods: {
    compare(a, b) {
      if (a.value > b.value) {
        return 1;
      } else if (a.value < b.value) {
        return -1;
      }
      return 0;
    },
    sortItems() {
      console.log(this.agendaItems.sort(this.compare));
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles.scss";

.content-container {
  height: $page-with-header-height;
  padding: 20px;
}

.item-list {
  height: 100%;
  border: 2px solid $secondary-light;
  padding: 20px;
  overflow: auto;
}

.date-header {
  background-color: $secondary-light;
  font-size: 1em;
  width: 250px;
  margin: 0 10px 10px 0;
  border-radius: 5px;
  color: white;
}

.agenda-item {
  border: 2px solid $secondary-light;
  height: 80px;
  margin-bottom: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    border-image: $orange-gradient;
    border-image-slice: 1;
    border-width: 2px;
    box-shadow: $shadow-hovered;
  }
}
</style>
