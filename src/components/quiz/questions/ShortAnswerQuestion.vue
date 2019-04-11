<template>
  <div id="question">
    <h1>{{ definition }}</h1>
    <input
      v-model.trim="userAnswer"
      class="answer-input"
      type="text"
      :class="{ correct }"
      @input="handleInput()"
    />
  </div>
</template>

<script>
export default {
  name: "ShortAnswerQuestion",
  props: {
    term: {
      type: String,
      required: true
    },
    definition: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      userAnswer: "",
      correct: false,
      answered: false
    };
  },
  methods: {
    handleInput() {
      // Check if answered logic
      if (!this.answered && this.userAnswer !== "") {
        this.answered = true;
        this.$emit("answered", true);
      } else if (this.answered && this.userAnswer == "") {
        this.answered = false;
        this.$emit("answered", false);
      }

      // Check correct logic
      if (this.userAnswer.toLowerCase() === this.term.toLowerCase()) {
        this.correct = true;
        this.$emit("correct", true);
      } else {
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

.answer-input {
  margin-top: 10px;
  box-shadow: $shadow;
  text-align: center;
  background-color: white;
  border: none;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 24px;
  width: 400px;
  height: 50px;

  &:focus {
    outline: 0;
    background-color: darken(#e7e7e7, 5);
  }
}
</style>
