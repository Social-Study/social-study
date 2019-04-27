<!-- SCI ID: 008 -->
<!-- Name: Quiz -->
<!-- Version: 1.2 -->

<template>
  <div>
    <page-title>
      <template slot="left">
        <button
          v-if="showCorrect === false"
          class="btn btn-primary"
          @click="showCorrect = true"
        >
          Submit Quiz
        </button>
        <button
          v-else
          class="btn btn-error"
          @click="$router.go(-1)"
        >
          Done
        </button>
      </template>
      <template slot="center">
        Quiz
      </template>
      <template slot="right">
        <h2
          v-if="showCorrect === false"
          class="title"
        >
          Answered: {{ answeredQuestions }}/{{ totalQuestions }}
        </h2>
        <h2
          v-else
          class="title"
        >
          Score: {{ Math.round((correctQuestions / totalQuestions) * 100) }}%
          ({{correctQuestions}} / {{totalQuestions}})
        </h2>

      </template>
    </page-title>

    <div
      v-if="terms && definitions && questionTypes"
      class="quiz-content"
    >
      <div v-if="questionTypes.shortAnswer == true">
        <short-answer-question
          v-for="(term, index) in questionGroups.shortAnswer.terms"
          :key="index"
          :term="term"
          :definition="questionGroups.shortAnswer.definitions[index]"
          :showCorrect="showCorrect"
          @answered="handleAnswered"
          @correct="handleCorrect"
        />
      </div>
      <div v-if="questionTypes.multipleChoice == true">
        <multiple-choice-question
          v-for="(term, index) in questionGroups.multipleChoice.terms"
          :key="index"
          :term="term"
          :definition="questionGroups.multipleChoice.definitions[index]"
          :choice-list="shuffledTerms"
          :showCorrect="showCorrect"
          @answered="handleAnswered"
          @correct="handleCorrect"
        />
      </div>
      <div v-if="questionTypes.dragAndDrop == true">
        <drag-drop-question
          v-for="(termArray, index) in questionGroups.dragAndDrop.terms"
          :key="index"
          :terms="termArray"
          :defs="questionGroups.dragAndDrop.definitions[index]"
          :showCorrect="showCorrect"
          @answered="handleAnswered"
          @correct="handleCorrect"
        />
      </div>
      <matching-question v-if="questionTypes.matching == true" />
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
      // If true, the questions will show which are correct
      showCorrect: false,
      answeredQuestions: 0,
      correctQuestions: 0,
      totalQuestions: this.terms.length,
      // Shuffled versions of the props
      shuffledTerms: this.terms,
      shuffledDefs: this.definitions,
      // Stores the shuffled questions sorted into groups
      questionGroups: {
        multipleChoice: {
          terms: [],
          definitions: []
        },
        shortAnswer: {
          terms: [],
          definitions: []
        },
        dragAndDrop: {
          terms: [],
          definitions: []
        }
      }
    };
  },
  created() {
    // If the props are not found go back to quiz create page
    // This only happens when the user refreshes (right now there is no fix)
    if (!this.terms && !this.definitions && !this.questionTypes) {
      this.$router.push({ name: "createQuiz" });
    }

    // Shuffle All Term/Def combos
    this.shuffleAll();

    // Determine how many of each question type to create
    this.splitQuestions();
  },
  methods: {
    handleAnswered(isAnswered) {
      if (isAnswered) {
        this.answeredQuestions++;
      } else if (!isAnswered) {
        this.answeredQuestions--;
      }
    },
    handleCorrect(isCorrect) {
      console.log(this.totalQuestions);

      if (isCorrect && this.correctQuestions < this.totalQuestions) {
        console.log("Question is correct. Incrementing...");
        this.correctQuestions++;
      } else if (!isCorrect && this.correctQuestions > 0) {
        console.log("Question is incorrect. Decrementing");
        this.correctQuestions--;
      } else {
        console.log("There is an error in logic. Doing nothing.");
      }
    },
    /**
     * Shuffle the term and definition arrays in the same manner so the
     * corresponding term and defintion still match
     */
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
    /**
     * Split the question and term arrays into subparts and assign them to
     * the user's specifically selected question types.
     */
    splitQuestions() {
      // Count the number of different types to create
      let qTypeCount = 0;
      Object.values(this.questionTypes).forEach(value => {
        if (value) {
          qTypeCount++;
        }
      });

      // Number of splits to make by dividing total terms by num question types
      let size = Math.floor(this.shuffledTerms.length / qTypeCount);

      // Split the question/def combo accordingly
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
        } else if (
          // User selected short answer and questions haven't yet been generated
          this.questionTypes.dragAndDrop &&
          this.questionGroups.dragAndDrop.terms.length === 0
        ) {
          let terms = [];
          let defs = [];

          for (let j = i; j < this.shuffledTerms.length; j += 4) {
            terms.push(this.shuffledTerms.slice(j, j + 4));
            defs.push(this.shuffledDefs.slice(j, j + 4));
          }

          this.questionGroups.dragAndDrop = {
            terms: terms,
            definitions: defs
          };
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles.scss";

#question {
  margin-top: 20px;
  margin-bottom: 20px;
}

.quiz-content {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  max-height: $page-with-header-height;
  overflow-y: auto;
}
</style>
