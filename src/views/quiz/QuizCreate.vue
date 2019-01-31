<template>
  <div>
    <page-title>
      <template slot="center">
        Create a New Quiz
      </template>
      <template slot="right">
        <!-- Using the title class in the PageTitle component -->
        <!-- <h2 class="title">Total: {{questionCount}}</h2> -->
        <h2 class="title">{{questionCount}}/100</h2>
      </template>
    </page-title>
    <div class="content-container">
      <h3 id="step-instruction">Select Decks to Generate Your Quiz</h3>
      <h5 id="step-hint">Quiz has a 100 card limit</h5>
      <!-- Component that displays checkboxes of each available flashcard deck -->
      <!-- :allowSelect="questionCount < 7 ? true : false" -->
      <deck-selector
        :limit="100"
        @selected="selectedDecks = $event"
      />
      <h3 id="step-instruction">Select Quiz Question Types</h3>
      <!-- TODO: Create question type selectors. -->
      <button class="btn btn-success">
        Generate
      </button>
    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/navigation/PageTitle";
import DeckSelector from "@/components/quiz/DeckSelector";

// TODO: Create selectors for the question types

export default {
  name: "QuizCreate",
  components: {
    PageTitle,
    DeckSelector
  },
  data() {
    return {
      selectedDecks: null
    };
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
