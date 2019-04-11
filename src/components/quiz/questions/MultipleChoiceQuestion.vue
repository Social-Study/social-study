<!-- SCI ID: 026 -->
<!-- Name: MultipleChoiceQuestion -->
<!-- Version: 1.0 -->
<template>
  <div id="question">
    <h1>{{ definition }}</h1>
    <div
      class="choices"
      :class="{ correct }"
    >
      <div
        v-for="i in 4"
        :key="i"
        class="answers"
      >
        <input
          type="radio"
          class="custom-radio"
          :name="definition"
          :value="i - 1"
          @change="checkCorrect(i - 1)"
        />
        {{ choices[i - 1] }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MultipleChoiceQuestion",
  props: {
    term: {
      type: String,
      required: true
    },
    definition: {
      type: String,
      required: true
    },
    choiceList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      choices: [],
      correctIndex: null,
      picked: false,
      correct: false
    };
  },
  created() {
    // Determine what index will hold the correct value
    this.correctIndex = Math.floor(Math.random() * 4);
    for (let i = 0; i < 4; i++) {
      this.choices.push(this.getChoice(i));
    }
    // console.log("Correct Index:", this.correctIndex);
  },
  methods: {
    // TODO: Make sure all choices are non duplicates
    /**
     * Determine which term to place in the given index
     * The correct term will be placed in the proper index
     */
    getChoice(index) {
      if (index === this.correctIndex) {
        return this.term;
      } else {
        let randomIndex;
        let wrongChoice;
        // Loop until we get an option that isn't the same as the correct term.
        do {
          randomIndex = Math.floor(Math.random() * this.choiceList.length);
          wrongChoice = this.choiceList[randomIndex];
        } while (wrongChoice === this.term);

        return wrongChoice;
      }
    },
    checkCorrect(chosenIndex) {
      console.log(chosenIndex, "vs", this.correctIndex);

      // Items can only be selected once. Set picked to true when the click an option
      if (!this.picked) {
        this.picked = true;
        this.$emit("answered", true);
      }

      if (chosenIndex == this.correctIndex) {
        this.$emit("correct", true);
        this.correct = true;
      } else {
        //  If already marked incorrect, do nothing
        if (this.correct) {
          this.correct = false;
          this.$emit("correct", false);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles.scss";

h1 {
  margin: 0;
  font-size: 28px;
}

// TODO: Improve alignment and centering
.choices {
  padding: 30px;
  margin-top: 10px;

  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;

  border-radius: 26px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.35);

  background-color: #e7e7e7;

  &.correct {
    border: 2px solid green;
  }
  .answers {
    justify-items: stretch;
    padding: 10px;

    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;

    font-size: 1.3em;
    text-align: justify;
  }
}

.custom-radio {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  display: inline-block;
  position: relative;
  background-color: #bebebe;
  color: #666;
  height: 30px;
  width: 30px;
  border: 0;
  border-radius: 50px;
  cursor: pointer;
  margin-right: 7px;
  outline: none;
}
.custom-radio:hover {
  background-color: #f1f1f1;
}
.custom-radio:checked {
  background-image: $green-gradient2;
}
label {
  color: #666;
  cursor: pointer;
}
</style>
