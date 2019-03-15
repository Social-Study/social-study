// Use these style classes on your components to style them like the other pages
// name-input: Used for input boxes that allow the user to change the name of their content
// split: Used to apply spacing between buttons in the title bar
<template>
  <div class="pageTitel-container">
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
      <hr>
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

.pageTitel-container{
  margin-bottom: 20px;
}

hr{
  margin:0px;
  height: 1px;
  background-image: $orange-gradient;
  border:none;
}

.header-container {
  background-color: transparent;
  font-family: $secondary-font;
  color:$dark;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  height: $header-height;

  .name-input {
    border: none;
    font-size: 10px;
    min-width: 350px;
    max-width: 350px;
    height: 26px;
    font-weight: bold;
    font-family: $primary-font;
    font-weight: 400;
  }

  button {
    margin: 0;
  }

  // Applied to buttons that are split apart in the header
  .split {
    margin-left: 20px;
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

    .form-input {
      width: 250px;
    }

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
