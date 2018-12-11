<template>
  <figure
    v-if="this.user.photoURL === null"
    :data-initial="initials"
    class="avatar avatar-lg"
  >
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
    user: Object
  },
  data: function() {
    return {
      initials: ""
    };
  },
  created: function() {
    // Split the username into initials if there is not a photo
    if (this.user.photoURL === null) {
      this.initials = this.user.displayName
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
</style>
