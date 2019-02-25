<template>
  <div
    class="quiz-content"
    v-if="terms && definitions && questionTypes"
  >
    <short-answer-question v-if="questionTypes.includes('Short Answer')" />
    <matching-question v-if="questionTypes.includes('Matching')" />
    <multiple-choice-question v-if="questionTypes.includes('Multiple Choice')" />
    <drag-drop-question v-if="questionTypes.includes('Drag and Drop')" />

  </div>
  <div v-else>
    <h1>Error Loading Quiz</h1>
  </div>
</template>

<script>
import MatchingQuestion from "@/components/quiz/questions/ShortAnswerQuestion";
import ShortAnswerQuestion from "@/components/quiz/questions/MatchingQuestion";
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
      type: Array,
      required: true
    }
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
