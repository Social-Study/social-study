<template>
  <div class="note">
    <div
      @click.prevent="$emit('viewNote')"
      class="content"
    >
      <h1>{{info.title}}</h1>
      <div class="details">
        <h2>Last Updated:</h2>
        <h3>{{info.lastUpdated.toDate().toLocaleDateString()}} - {{info.lastUpdated.toDate().toLocaleTimeString('en-US')}}</h3>
        <h2>Created:</h2>
        <h3>{{info.creationDate.toDate().toLocaleDateString()}} - {{info.creationDate.toDate().toLocaleTimeString('en-US')}}</h3>
      </div>
    </div>
    <div class="button-group">
      <button
        @click="$emit('viewNote')"
        class="note-btn edit"
      >
        <i class="fas fa-edit"></i>
      </button>
      <button
        @click="$emit('delete')"
        class="note-btn delete"
      >
        <i class="btn-delete fas fa-trash-alt"></i>
      </button>
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

.button-group {
  min-width: 100%;
  padding: 0;
  align-self: flex-start;

  .note-btn {
    width: 50%;
    height: 40px;
    background-color: #e7e7e7;
    border: none;

    &:hover {
      background-color: $primary;
      color: $light;
    }
  }

  .note-btn.edit {
    border-bottom-left-radius: 2px;
    border-top: 1px solid $dark;
    border-right: 1px solid $dark;
  }

  .note-btn.delete {
    border-bottom-right-radius: 2px;
    border-top: 1px solid $dark;
    color: red;
  }
}

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
  justify-content: space-between;
  word-break: break-all;

  h1 {
    padding: 8px 4px 0 4px;
    font-size: 1.4em;
    font-weight: bold;
    word-break: normal;
  }

  .details {
    padding: 5px;

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
