<template>
  <div id="question">
    <h1>2. What is the capital of Spain?</h1>
    <div id="choices">
      <div class="answers">
        <input
          type="radio"
          class="custom-radio"
          name="answer"
          id=""
        > Amsterdam
      </div>
      <div class="answers">
        <input
          type="radio"
          class="custom-radio"
          name="answer"
          id=""
        > Madrid
      </div>
      <div class="answers">
        <input
          type="radio"
          class="custom-radio"
          name="answer"
          id=""
        > Berlin
      </div>
      <div class="answers">
        <input
          type="radio"
          class="custom-radio"
          name="answer"
          id=""
        > Dublin
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "MultipleChoiceQuestion"
};
</script>

<style lang="scss" scoped>
@import "@/styles.scss";

h1 {
  margin: 0;
  font-size: 28px;
}

// TODO: Improve alignment and centering
#choices {
  padding: 30px;
  margin-top: 10px;

  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;

  border-radius: 26px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.35);

  background-color: #e7e7e7;
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
// .custom-radio:checked::before {
//   // position: absolute;
//   // font: 13px/1 "Open Sans", sans-serif;
//   // left: 11px;
//   // top: 7px;
//   // content: "\02143";
//   // // transform: rotate(40deg);
// }
.custom-radio:hover {
  background-color: #f1f1f1;
}
.custom-radio:checked {
  background-image: $green-gradient2;
}
label {
  // font: 300 16px/1.7 "Open Sans", sans-serif;
  color: #666;
  cursor: pointer;
}
</style>
