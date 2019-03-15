<template>
  <div id="question">
    <h1>{{definition}}</h1>
    <div
      class="choices"
      :class="{correct}"
    >
      <div
        class="answers"
        v-for="i in 4"
        :key="i"
      >
        <input
          type="radio"
          class="custom-radio"
          :name="definition"
          :value="i-1"
          v-model.number="picked"
          @change="checkCorrect()"
        > {{choices[i-1]}}
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
      picked: null,
      keys: [],
      correct: false
    };
  },
  created() {
    this.correctIndex = Math.floor(Math.random() * 4);
    for (let i = 0; i < 4; i++) {
      this.choices.push(this.getChoice(i));
    }
    // console.log("Correct Index:", this.correctIndex);
  },
  methods: {
    // TODO: Make sure all choices are non duplicates
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
          // console.log("wrongChoice:", wrongChoice, "term:", this.term);
        } while (wrongChoice === this.term);

        return wrongChoice;
      }
    },
    checkCorrect() {
      if (this.picked == this.correctIndex) {
        this.$emit("correct", true);
        this.correct = true;
      } else {
        this.$emit("correct", false);
        this.correct = false;
      }
    }
  },
  watch: {
    picked(newVal, oldVal) {
      // console.log(oldVal, newVal);
      if (oldVal === null && newVal !== null) {
        this.$emit("answered", true);
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
