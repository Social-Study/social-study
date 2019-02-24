<template>
  <div>
    <div id="container">
      <div
        v-for="type in questionTypes"
        :key="type.type"
        id="type-toggle"
        :class="type.selected ? 'selected': ''"
        @click="toggleSelected(type)"
      >
        <div id="type-header">
          {{ type.type }}
          <!-- <div id="type-description">
            {{ type.description}}
          </div> -->
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { db } from "@/firebaseConfig";

export default {
  name: "QuestionTypeSelector",
  data() {
    return {
      questionTypes: [
        {
          type: "Multiple Choice",
          description:
            "Select correct term for the given definition from the given options",
          selected: false
        },
        {
          type: "Matching",
          description: "Match the correct term to the given definition",
          selected: false
        },
        {
          type: "Drag and Drop",
          description: "Drag the correct term to the given definition",
          selected: false
        },
        {
          type: "Short Answer",
          description: "Type the correct term for the given definition",
          selected: false
        }
      ]
    };
  },
  methods: {
    toggleSelected(type) {
      type.selected = !type.selected;
      this.$emit("selected", this.getAllSelected());
    },
    getAllSelected() {
      let selected = [];
      this.questionTypes.forEach(type => {
        if (type.selected === true) {
          selected.push({
            type: type.type
          });
        }
      });
      return selected;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles.scss";

#container {
  margin: 20px;
  padding: 0 50px;
  display: grid;
  transition: all 350ms ease-in;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;

  #type-toggle {
    cursor: pointer;
    user-select: none;

    width: 200px;
    height: 60px;
    margin: 20px;

    display: flex;
    flex-flow: col nowrap;
    justify-content: center;
    align-items: center;

    border: 2px solid $secondary-light;

    #type-header {
      text-align: center;
      font-family: $secondary-font;
      font-weight: 700;

      #type-description {
        font-size: 12px;
        color: $secondary-light;
      }
    }

    &.selected {
      border-image: $orange-gradient;
      border-image-slice: 1;
      border-width: 2px;
      box-shadow: $shadow-heavy;
    }
  }
}
</style>
