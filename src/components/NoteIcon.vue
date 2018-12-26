<template>
  <div class="note">
    <h1>{{info.title}}</h1>
    <div class="details">
      <h2>Last Updated:</h2>
      <h3>{{info.lastUpdated.toDate().toLocaleDateString()}} - {{info.lastUpdated.toDate().toLocaleTimeString('en-US')}}</h3>
      <h2>Created:</h2>
      <h3>{{info.creationDate.toDate().toLocaleDateString()}} - {{info.creationDate.toDate().toLocaleTimeString('en-US')}}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoteIcon",
  props: {
    info: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styleVariables.scss";
.note {
  cursor: pointer;
  width: 200px;
  height: 250px;
  background-color: #e7e7e7;
  color: #3c3c3c;
  box-shadow: $shadow-heavy;
  border-radius: 2px;
  margin: 0 40px 40px 0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  word-break: break-all;

  padding: 5px;

  &:hover {
    box-shadow: $shadow-hovered;
  }

  h1 {
    font-size: 1.4em;
    font-weight: bold;
    word-break: normal;
  }

  .details {
    h2 {
      text-align: left;
      font-size: 1.1em;
      font-weight: bold;
      align-self: flex-start;
    }

    h3 {
      font-size: 0.8em;
      align-self: flex-end;
      text-align: center;
    }
  }
}
</style>
