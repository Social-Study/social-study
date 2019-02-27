<template>
  <div>
    <page-title>
      <template slot="center">
        Quiz
      </template>
      <template slot="right">
        <h2 class="title">Answered: 0/10</h2>
      </template>
    </page-title>
    <div
      class="quiz-content"
      v-if="terms && definitions && questionTypes"
    >
      <div v-if="questionTypes.shortAnswer == true">
        <short-answer-question
          v-for="(term, index) in questionGroups.shortAnswer.terms"
          :key="index"
          :term="term"
          :definition="questionGroups.shortAnswer.definitions[index]"
        />
      </div>
      <div v-if="questionTypes.multipleChoice == true">
        <multiple-choice-question
          v-for="(term, index) in questionGroups.multipleChoice.terms"
          :key="index"
          :term="term"
          :definition="questionGroups.multipleChoice.definitions[index]"
          :choiceList="shuffledTerms"
        />
      </div>
      <matching-question v-if="questionTypes.matching == true" />
      <drag-drop-question v-if="questionTypes.dragAndDrop == true" />

    </div>
    <div v-else>
      <h1>Error Loading Quiz</h1>
    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/navigation/PageTitle";

import ShortAnswerQuestion from "@/components/quiz/questions/ShortAnswerQuestion";
import MatchingQuestion from "@/components/quiz/questions/MatchingQuestion";
import MultipleChoiceQuestion from "@/components/quiz/questions/MultipleChoiceQuestion";
import DragDropQuestion from "@/components/quiz/questions/DragDropQuestion";

export default {
  name: "Quiz",
  components: {
    PageTitle,
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
  data() {
    return {
      shuffledTerms: this.terms,
      shuffledDefs: this.definitions,
      questionGroups: {
        multipleChoice: {
          terms: [],
          definitions: []
        },
        shortAnswer: {
          terms: [],
          definitions: []
        }
      }
    };
  },
  methods: {
    // Shuffle both arrays so that the contents are still parallel
    shuffleAll() {
      for (let i = this.shuffledTerms.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.shuffledTerms[i], this.shuffledTerms[j]] = [
          this.shuffledTerms[j],
          this.shuffledTerms[i]
        ];
        [this.shuffledDefs[i], this.shuffledDefs[j]] = [
          this.shuffledDefs[j],
          this.shuffledDefs[i]
        ];
      }
    },
    splitQuestions() {
      // Count the number of different selected question types
      let qTypeCount = 0;
      Object.values(this.questionTypes).forEach(value => {
        if (value) {
          qTypeCount++;
        }
      });
      console.log("Question Types:", qTypeCount);

      let size = Math.floor(this.shuffledTerms.length / qTypeCount);
      console.log("Size:", size);

      // Split the ques/def combo accordingly
      for (let i = 0; i < this.shuffledTerms.length; i += size) {
        // User selected multiple choice and questions haven't yet been generated
        if (
          this.questionTypes.multipleChoice &&
          this.questionGroups.multipleChoice.terms.length === 0
        ) {
          this.questionGroups.multipleChoice = {
            terms: this.shuffledTerms.slice(i, i + size),
            definitions: this.shuffledDefs.slice(i, i + size)
          };
        } else if (
          // User selected short answer and questions haven't yet been generated
          this.questionTypes.shortAnswer &&
          this.questionGroups.shortAnswer.terms.length === 0
        ) {
          this.questionGroups.shortAnswer = {
            terms: this.shuffledTerms.slice(i, i + size),
            definitions: this.shuffledDefs.slice(i, i + size)
          };
        }
      }
    }
  },
  created() {
    // Shuffle All Term/Def combos
    if (!this.terms && !this.definitions && !this.questionTypes) {
      this.$router.go(-1);
    }
    this.shuffleAll();
    console.log(this.shuffledTerms);
    console.log(this.shuffledDefs);
    // Determine how many of each question type to create
    this.splitQuestions();
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
  margin-bottom: 20px;
}
</style>
