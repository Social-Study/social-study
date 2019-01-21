// Use these style classes on your components to style them like the other pages
// name-input: Used for input boxes that allow the user to change the name of their content
// split: Used to apply spacing between buttons in the title bar
<template>
  <div
    class="header-container"
    :class="$store.getters.chatActive ? 'chat-active' : ''"
  >
    <slot
      class="left"
      name="left"
    ></slot>
    <h1 class="text-ellipsis">
      <slot name="center"></slot>
    </h1>
    <slot
      class="right"
      name="right"
    ></slot>
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
  padding: 8px 8px;
  background-color: $secondary-light;
  font-family: "Montserrat";

  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  height: $header-height;

  .name-input {
    border: none;
    background-color: #f6f6f6;
    font-size: 20px;
    min-width: 350px;
    max-width: 350px;
    height: 36px;
    font-weight: bold;
    padding: 0 4px;
    font-family: "Inter UI";
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
  }

  h1 {
    flex: 1;
    user-select: none;
    font-size: 2em;
    margin: 0;
    font-weight: 600;
  }

  .right {
    flex: 1;
  }
}
</style>
