<template>
  <div
    v-if="!user"
    class="loading loading-lg loading-indicator"
    :class="getLoadingSize"
  ></div>
  <figure
    v-else-if="this.user.photoURL === null"
    :style="{backgroundColor: color}"
    :data-initial="computedInitials"
    class="avatar"
    :class="getSize"
  >
  </figure>

  <figure
    v-else
    class="avatar"
    :class="getSize"
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
      required: false
    },
    color: {
      type: String,
      default: "#f6f6f6"
    },
    size: {
      type: String,
      default: "none"
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
    },
    // Set size of the avatar icon
    getSize() {
      switch (this.size) {
        case "":
          return "";
        case "sm":
          return "avatar-sm";
        case "md":
          return "";
        case "lg":
          return "avatar-lg";
        case "xl":
          return "avatar-xl";
      }
      return "";
    },
    // Set the size of the corresponding loading indicator
    getLoadingSize() {
      switch (this.size) {
        case "":
          return "load";
        case "sm":
          return "load-sm";
        case "md":
          return "load";
        case "lg":
          return "load-lg";
        case "xl":
          return "load-xl";
      }
      return "";
    }
  }
};
</script>

<style lang="scss" scoped>
// Avatar placeholder
.loading-indicator {
  background-color: #3c3c3c;
  border-radius: 50%;
}

// Set the sizing of the placeholder loading indicator
.load {
  height: 32px;
  width: 32px;
}

.load-sm {
  height: 24px;
  width: 24px;
}

.load-lg {
  height: 48px;
  width: 48px;
}

.load-xl {
  height: 64px;
  width: 64px;
}

// Text color of the initial
figure.avatar {
  color: #3c3c3c;
}
</style>
