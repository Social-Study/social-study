<template>
  <div>
    <page-title>
      <template slot="left">
        <button
          class="btn btn-success btn-lg"
          :class="selectedDecks == null ||
                  questionCount === 0 ||
                  selectedQTypes == null ||
                  selectedQTypes.length === 0 ? 'disabled': ''"
          @click="loadQuiz()"
        >
          Generate
        </button>
      </template>
      <template slot="center">
        Create a New Quiz
      </template>
      <template slot="right">
        <!-- Using the title class in the PageTitle component -->
        <h2 class="title">{{questionCount}}/100</h2>
      </template>
    </page-title>
    <div class="content-container">
      <h3 id="step-instruction">Select Quiz Question Types</h3>
      <question-type-selector @selected="selectedQTypes = $event" />

      <h3 id="step-instruction">Select Decks to Generate Your Quiz</h3>
      <h5 id="step-hint">Quiz has a 100 card limit</h5>
      <!-- Component that displays checkboxes of each available flashcard deck -->
      <deck-selector
        :limit="100"
        @selected="selectedDecks = $event"
      />

    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/navigation/PageTitle";
import DeckSelector from "@/components/quiz/DeckSelector";
import QuestionTypeSelector from "@/components/quiz/QuestionTypeSelector";

export default {
  name: "QuizCreate",
  components: {
    PageTitle,
    DeckSelector,
    QuestionTypeSelector
  },
  data() {
    return {
      selectedDecks: null,
      selectedQTypes: null
    };
  },
  methods: {
    loadQuiz() {
      console.log("click");
      let terms = [];
      let defs = [];
      this.selectedDecks.public.forEach(deck => {
        terms = terms.concat(deck.terms);
        defs = defs.concat(deck.definitions);
      });

      this.selectedDecks.private.forEach(deck => {
        console.log(deck);
        terms = terms.concat(deck.terms);
        defs = defs.concat(deck.definitions);
      });

      this.$router.replace({
        name: "quiz",
        params: {
          terms: terms,
          definitions: defs,
          questionTypes: this.selectedQTypes
        }
      });
    }
  },
  computed: {
    questionCount() {
      // Return the total number of cards/questions in the selected decks
      if (this.selectedDecks !== null) {
        let total = 0;
        this.selectedDecks.public.forEach(deck => {
          total += deck.terms.length;
        });
        this.selectedDecks.private.forEach(deck => {
          total += deck.terms.length;
        });

        return total;
      }
      return 0;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles.scss";

#step-instruction {
  text-align: left;
  padding-top: 20px;
  margin: 0 20px 20px 20px;
}

#step-hint {
  text-align: left;
  color: $secondary-light;
  margin: 0 20px 20px 20px;
}

.content-container {
  height: $page-with-header-height;
}
</style>
