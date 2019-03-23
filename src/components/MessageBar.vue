<template>
  <div class="toast" :class="color">
    <button
      class="btn btn-clear float-right"
      @click="$emit('closeMessage')"
    ></button>
    <slot>Message Here</slot>
  </div>
</template>

<script>
export default {
  name: "MessageBar",
  props: {
    visible: Boolean,
    type: String
  },
  data() {
    return {};
  },
  computed: {
    color() {
      return {
        "toast-primary": this.type === "success",
        "toast-error": this.type === "error"
      };
    }
  }
};
</script>

<style scoped>
.toast-error {
  background-color: #ff0000;
  border-color: #ff0000;
}
</style>
