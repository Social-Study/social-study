<template>
  <div class="note">
    Example Note
  </div>
</template>

<script>
export default {
  name: "NoteIcon"
};
</script>

<style lang="scss" scoped>
@import "../styleVariables.scss";

.note {
  width: 200px;
  height: 250px;
  background-color: #e7e7e7;
  color: #3c3c3c;
  box-shadow: $shadow-heavy;
  margin: 0 40px 40px 0;

  &:hover {
    box-shadow: $shadow-hovered;
  }
}
</style>
