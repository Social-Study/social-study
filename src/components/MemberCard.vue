<template>
  <!-- Add Member Card -->
  <div
    v-if="add"
    class="profile-card"
  >
    <div class="gradient-border add">
      <div class="add-button">
        <h1 class="button-icon">+</h1>
      </div>
    </div>
    <h2>Invite Member</h2>
  </div>

  <!-- Member Display Card -->
  <div
    v-else
    class="profile-card"
  >
    <div class="gradient-border">
      <Avatar
        class="profile-image"
        :user="{photoURL: photoURL, displayName: displayName}"
      />
    </div>
    <h2 style="width: 100%;">{{ displayName }}</h2>
  </div>
</template>

<script>
import Avatar from "./Avatar";

export default {
  name: "MemberCard",
  components: {
    Avatar
  },
  props: {
    photoURL: String,
    displayName: String,
    add: {
      type: Boolean,
      default: false,
      required: false
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styleVariables.scss";

// Individual info card
.profile-card {
  // cursor: pointer;
  height: 300px;
  width: 300px;
  margin: 0 20px 20px 0px;
  border-radius: 16px;
  background-color: white;
  box-shadow: $shadow;
  user-select: none;

  &:hover {
    box-shadow: $shadow-hovered;
  }
}

// gradient background around border
.gradient-border {
  margin: 30px auto;
  height: 160px;
  width: 160px;
  border-radius: 50%;
  background-image: $blue-gradient;
}

.add {
  background-image: $nav-gradient;
  cursor: pointer;
}

// Icon on the new members button
.button-icon {
  text-align: center;
  font-size: 144px;
  font-weight: 600;
  // TODO: Add gradient button later, not working on chrome because the -webkit-text-fill-color
  // background: $nav-gradient;
  // color: transparent;
  // -webkit-text-fill-color: transparent;
  background-clip: text;
  bottom: 25px;
  position: relative;
  vertical-align: center;
}

// Circle background between the gradient and add icon
.add-button {
  position: relative;
  top: 10px;
  left: 10px;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background-color: #bebebe;
  user-select: none;
}

// Image on top of the gradient background
.profile-image {
  position: relative;
  top: 10px;
  width: 140px;
  height: 140px;
  font-size: 60px;
}
</style>
