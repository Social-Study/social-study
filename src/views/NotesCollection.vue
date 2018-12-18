<template>
  <div>
    <page-title>Notes Collection</page-title>
    <div class="content-container">
      <note-icon />
      <note-icon />
      <note-icon />
      <note-icon />
      <note-icon />
      <note-icon />
    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/PageTitle";
import NoteIcon from "@/components/NoteIcon";

export default {
  name: "NotesCollection",
  components: {
    PageTitle,
    NoteIcon
  }
};
</script>

<style lang="scss" scoped>
.content-container {
  margin-top: 40px;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}
</style>
