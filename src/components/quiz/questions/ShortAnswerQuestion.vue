<template>
  <div id="question">
    <h1>1. What is the capital of Brazil?</h1>
    <input
      id="answer-input"
      type="text"
    >
  </div>
</template>

<script>
export default {
  name: "ShortAnswerQuestion"
};
</script>

<style lang="scss" scoped>
h1 {
  margin: 0;
  font-size: 28px;
}

#answer-input {
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
}
</style>
