<template>
  <div id="question">
    <h1>{{definition}}</h1>
    <input
      class="answer-input"
      type="text"
      v-model.trim="userAnswer"
      @input="handleInput()"
      :class="{ correct }"
    >
  </div>
</template>

<script>
export default {
  // TODO: Emit something if the user's input is correct
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
      if (this.userAnswer.toLowerCase() === this.term.toLowerCase()) {
        this.correct = true;
        this.$emit("correct", true);
      } else {
        this.correct = false;
        this.$emit("correct", false);
      }
    }
  },
  watch: {
    userAnswer(newVal, oldVal) {
      // console.log(oldVal, newVal);
      if (oldVal === "" && newVal !== "") {
        this.$emit("answered", true);
      } else if (oldVal !== "" && newVal == "") {
        this.$emit("answered", false);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  margin: 0;
  font-size: 28px;
}

.answer-input {
  margin-top: 10px;
  border-radius: 10px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.35);
  background-color: #e7e7e7;
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

.correct {
  border: 2px solid green;
}
</style>
