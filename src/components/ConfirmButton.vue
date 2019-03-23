<template>
  <div class="popover popover-left">
    <button class="btn btn-action btn-error">
      <i class="fas fa-trash-alt"></i>
    </button>
    <div class="popover-container">
      <div class="card">
        <div class="card-header">
          <h5>
            <slot name="title"></slot>
          </h5>
        </div>
        <div class="card-body">
          <slot name="body"></slot>
        </div>
        <div class="card-footer">
          <button
            class="btn btn-error"
            @click="$emit('buttonClicked')"
          >
            <slot name="button-text"></slot>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmButton"
};
</script>

<style lang="scss" scoped>
@import "@/styles.scss";

.popover-container {
  top: 100px !important;
  .card {
    box-shadow: $shadow-heavy;
  }
  .card-body {
    font-family: $primary-font;
  }

  .card-header {
    h5 {
      font-weight: 700;
    }
  }

  .card-footer > button {
    font-family: $primary-font;
  }
}
</style>
