<template>
  <div
    class="quiz-content"
    v-if="terms && definitions && questionTypes"
  >
    <short-answer-question v-if="questionTypes.shortAnswer == true" />
    <matching-question v-if="
      questionTypes.matching == true" />
    <multiple-choice-question v-if="questionTypes.multipleChoice == true" />
    <drag-drop-question v-if="questionTypes.dragAndDrop == true" />

  </div>
  <div v-else>
    <h1>Error Loading Quiz</h1>
  </div>
</template>

<script>
import ShortAnswerQuestion from "@/components/quiz/questions/ShortAnswerQuestion";
import MatchingQuestion from "@/components/quiz/questions/MatchingQuestion";
import MultipleChoiceQuestion from "@/components/quiz/questions/MultipleChoiceQuestion";
import DragDropQuestion from "@/components/quiz/questions/DragDropQuestion";

export default {
  name: "Quiz",
  components: {
    MatchingQuestion,
    ShortAnswerQuestion,
    DragDropQuestion,
    MultipleChoiceQuestion
  },
  props: {
    terms: {
      type: Array,
      required: true
    },
    definitions: {
      type: Array,
      required: true
    },
    questionTypes: {
      type: Object,
      required: true
    }
  },
  created() {
    // Shuffle All Term/Def combos
    // Determine how many of each question type to create
  }
};
</script>

<style lang="scss" scoped>
#question {
  margin-top: 40px;
}
.quiz-content {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
}
</style>
