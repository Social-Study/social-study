<template>
  <figure
    v-if="this.user.photoURL === null"
    :style="{backgroundColor: color}"
    :data-initial="computedInitials"
    class="avatar avatar-lg"
  >
    <!--  avatar-lg -->
  </figure>

  <figure
    v-else
    class="avatar avatar-lg"
  >
    <img :src="this.user.photoURL">
  </figure>

</template>

<script>
export default {
  name: "avatar",
  props: {
    user: {
      type: Object,
      required: true
    },
    color: {
      type: String,
      default: "#f6f6f6"
    }
  },
  computed: {
    computedInitials() {
      return this.user.displayName
        .split(" ")
        .map(word => {
          return word[0];
        })
        .join("");
    }
  }
};
</script>

<style lang="scss" scoped>
figure.avatar {
  color: #3c3c3c;
}
</style>
