<template>
  <!-- Add Member Card -->
  <div
    v-if="add"
    class="profile-card c-hand hoverable"
  >
    <div class="gradient-border add">
      <div class="add-button">
        <!-- <h1 class="button-icon">+</h1> -->
        <h1 class="button-icon"><i class="fas fa-plus"></i></h1>
      </div>
    </div>
    <h2>Invite Member</h2>
    <div class="gradient-underline"></div>
  </div>

  <!-- Member Display Card -->
  <div
    v-else
    class="profile-card"
    :class="description !== null ? 'tooltip tooltip-bottom' : ''"
    :data-tooltip="description"
  >
    <div class="gradient-border">
      <Avatar
        class="profile-image"
        :user="{photoURL: photoURL, displayName: displayName}"
      />
    </div>
    <h2
      style="width: 100%;"
      class="text-ellipsis"
    >{{ displayName }}
      <!-- Show crown icon on the owner's card -->
      <i
        v-if="owner"
        style="color: gold; z-index: 999;"
        class="fas fa-crown"
      ></i>
    </h2>

  </div>
</template>

<script>
import Avatar from "@/components/Avatar";

export default {
  name: "MemberCard",
  components: {
    Avatar
  },
  props: {
    photoURL: String,
    displayName: String,
    description: {
      type: String,
      required: false,
      default: null
    },
    add: {
      type: Boolean,
      default: false,
      required: false
    },
    owner: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles.scss";

// Individual info card
.profile-card {
  // cursor: pointer;
  height: 300px;
  width: 300px;
  margin: 0 20px 20px 0px;
  // border-radius: 16px;
  background-color: white;
  box-shadow: $shadow;
  user-select: none;
  border: 2px solid $secondary-light;

  .gradient-underline {
    display: none;
    height: 4px;
    width: 60%;
    margin: auto;
    margin-top: -15px;
    background-image: $orange-gradient;
  }
}

.hoverable {
  border-image: $orange-gradient;
  border-image-slice: 1;
  border-width: 2px;

  &:hover {
    border-width: 4px;
    box-shadow: $shadow-hovered;
    // h2 {
    //   font-weight: 700;
    // }
    .gradient-underline {
      display: block;
    }

    // .add-button > .button-icon {
    //   transform: scale(1.1);
    //   transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    // }
  }
}

h2 {
  font-size: 1.5em;
}

// gradient background around border
.gradient-border {
  margin: 30px auto;
  height: 160px;
  width: 160px;
  border-radius: 50%;
  background-image: $blue-gradient;
}

// Icon on the new members button
.button-icon {
  font-size: 6em;
  position: relative;
  top: 20px;
}

.add {
  background-image: $nav-gradient;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

// Circle background between the gradient and add icon
.add-button {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background-color: $light;
  user-select: none;

  display: flex;
  justify-content: center;
  align-items: center;
}

// Image on top of the gradient background
.profile-image {
  position: relative;
  top: 10px;
  width: 140px;
  height: 140px;
  font-size: 60px;
}

// // Individual info card
// .profile-card {
//   // cursor: pointer;
//   height: 200px;
//   width: 200px;
//   background-color: transparent;
//   user-select: none;

//   .gradient-underline {
//     display: none;
//     height: 4px;
//     width: 60%;
//     margin: auto;
//     margin-top: -15px;
//     background-image: $orange-gradient;
//   }
// }

// .hoverable {
//   &:hover {
//     box-shadow: $shadow-hovered;
//     h2 {
//       font-weight: 700;
//     }
//     .gradient-underline {
//       display: block;
//     }

//     // .add-button > .button-icon {
//     //   transform: scale(1.05);
//     //   transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
//     // }
//   }
// }

// h2 {
//   margin-top: 5px;
//   font-size: 1.2em;
// }

// // gradient background around border
// .gradient-border {
//   margin: 0px auto;
//   height: 110px;
//   width: 110px;
//   border-radius: 50%;
//   background-image: $blue-gradient;
// }

// .add {
//   background-image: $nav-gradient;
//   cursor: pointer;
//   display: flex;
//   flex-flow: row nowrap;
//   justify-content: center;
//   align-items: center;
// }

// // Icon on the new members button
// .button-icon {
//   text-align: center;
//   font-size: 4em;
//   top: 10px;
//   position: relative;
//   display: flex;
//   flex-flow: row nowrap;
//   justify-content: center;
//   align-items: center;
// }

// // Circle background between the gradient and add icon
// .add-button {

//   position: relative;
//   top: 5px;
//   left: 5px;
//   width: 100px;
//   height: 100px;

//   border-radius: 50%;
//   background-color: $light;
//   user-select: none;
// }

// // Image on top of the gradient background
// .profile-image {
//   position: relative;
//   top: 5px;
//   width: 100px;
//   height: 100px;
//   font-size: 60px;
// }
</style>
