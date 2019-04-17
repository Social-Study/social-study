<template>
  <div>
    <div id="container">
      <div
        v-for="type in questionTypes"
        id="type-toggle"
        :key="type.type"
        :class="type.selected ? 'selected' : ''"
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
        // {
        //   type: "Matching",
        //   description: "Match the correct term to the given definition",
        //   selected: false
        // },
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
      // Create object to be passed to the quiz page
      // Selected question types are set to true
      let selected = {
        matching: false,
        shortAnswer: false,
        multipleChoice: false,
        dragAndDrop: false
      };
      // Every selected type is set to true
      this.questionTypes.forEach(type => {
        if (type.selected === true) {
          switch (type.type) {
            case "Multiple Choice":
              selected.multipleChoice = true;
              break;
            case "Matching":
              selected.matching = true;
              break;
            case "Drag and Drop":
              selected.dragAndDrop = true;
              break;
            case "Short Answer":
              selected.shortAnswer = true;
              break;
            default:
            // This shoudl never be reached...
            // console.er("WTF");
          }
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
    background-color: white;
    width: 200px;
    height: 60px;
    margin: 20px;

    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

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
      border: $border-selected;
      box-shadow: $shadow;
    }

    &:hover {
      box-shadow: $shadow-hovered;
    }
  }
}
</style>
