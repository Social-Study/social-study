<template>
  <div>
    <page-title>
      <template slot="center">
        Create a New Quiz
      </template>
    </page-title>
    <div class="content-container">
      <h3 id="step-instruction">Select Decks to Generate Your Quiz</h3>
      <h5 id="step-hint">100 Term Limit</h5>
      <!-- Component that displays checkboxes of each available flashcard deck -->
      <deck-selector />
      <h3 id="step-instruction">Select Quiz Question Types</h3>
      <!-- TODO: Create question type selectors. -->
      <!-- <i class="fas fa-plus"></i> -->
      <button class="btn btn-success">
        Generate
      </button>
    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/navigation/PageTitle";
import DeckSelector from "@/components/quiz/DeckSelector";

export default {
  name: "QuizCreate",
  components: {
    PageTitle,
    DeckSelector
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
