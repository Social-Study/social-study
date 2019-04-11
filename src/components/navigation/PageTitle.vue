// Use these style classes on your components to style them like the other pages
// name-input: Used for input boxes that allow the user to change the name of
their content // split: Used to apply spacing between buttons in the title bar
<template>
  <div
    class="header-container"
    :class="$store.getters.chatActive ? 'chat-active' : ''"
  >
    <div class="left">
      <slot name="left"></slot>
    </div>
    <h1 class="center text-ellipsis">
      <slot name="center"></slot>
    </h1>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageTitle"
};
</script>

<style lang="scss" scoped>
@import "@/styles.scss";

.chat-active {
  // width: calc(100% + 20px);
  width: 100%;
}

.header-container {
  padding: 4px 8px;
  background-color: white;
  font-family: $secondary-font;
  color: $dark;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  height: $header-height;

  // Create bottom gradient border without <hr> element
  background-image: none, $orange-gradient;
  background-size: 100% 1px;
  background-position: 0% 0%, 0% 100%;
  background-repeat: no-repeat;

  // TODO: Figure out how to combine these two input styles. They are the same except a minor tweak
  .name-input {
    border: none;
    font-size: 20px;
    min-width: 300px;
    max-width: 300px;
    height: 36px;
    padding: 0 4px;
    font-weight: bold;
    font-family: $primary-font;
    font-weight: 400;
    border-bottom: 1px solid $dark;
    background-color: transparent;

    &:focus{
      outline: none;
    }
  }

  .search-input {
    border: none;
    font-size: 18px;
    min-width: 300px;
    max-width: 300px;
    height: 36px;
    padding: 0 30px;
    font-weight: bold;
    font-family: $primary-font;
    font-weight: 400;
    border-bottom: 1px solid $dark;
    background-color: transparent;
   
     &:focus{
      outline: none;
    } 
  }

  button {
    margin: 0;
  }

  // Applied to buttons that are split apart in the header
  .split {
    margin-left: 8px;
  }

  .left {
    flex: 1;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    // width: 300px;
  }

  // H1 Page Title
  .center {
    flex: 2;
    user-select: none;
    font-size: 1.4em;
    margin: 0;
    font-weight: 700;
    line-height: normal;
  }

  .right {
    flex: 1;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;

    .title {
      user-select: none;
      font-size: 1.6em;
      margin: 0;
      font-weight: 700;
      line-height: normal;
    }
  }
}
</style>
