<template>
  <!-- Messages from other members -->
  <div v-if="!sender" class="message" @click="showDate = !showDate">
    <div id="details-container">
      <div class="message-sender">{{ details.displayName }}</div>
      <transition
        name="dateTransition"
        enter-active-class="animated fadeIn slow"
        leave-active-class="animated fadeOut"
      >
        >
        <div class="message-date" v-show="showDate">{{ getSent }}</div>
      </transition>
    </div>
    <div class="message-inline">
      <div class="message-profile">
        <Avatar
          :user="{
            photoURL: details.photoURL,
            displayName: details.displayName
          }"
        />
      </div>
      <p class="message-content">{{ details.message }}</p>
    </div>
  </div>
  <!-- Messages from logged-in user -->
  <div v-else class="message sent" @click="showDate = !showDate">
    <div id="details-container">
      <transition
        name="dateTransition"
        enter-active-class="animated fadeIn slow"
        leave-active-class="animated fadeOut"
      >
        <div class="message-date" v-show="showDate">{{ getSent }}</div>
      </transition>
    </div>
    <div class="message-inline">
      <p class="message-content">{{ details.message }}</p>
    </div>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar";

export default {
  name: "Message",
  components: {
    Avatar
  },
  data() {
    return {
      showDate: false
    };
  },
  props: {
    sender: {
      type: Boolean,
      default: false
    },
    details: Object
  },
  computed: {
    getSent() {
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      let messageDate = this.details.date.toDate();
      let month = monthNames[messageDate.getMonth()];

      return (
        month +
        " " +
        messageDate.getDate() +
        ", " +
        messageDate.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true
        })
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.message {
  cursor: pointer;
  margin-bottom: 5px;
  max-width: 300px;

  #details-container {
    color: darkgrey;
    font-size: 12px;
    display: flex;
    flex-flow: row nowrap;

    .message-sender {
      margin-left: 40px;
    }

    .message-date {
      margin-right: 10px;
      margin-left: auto;
      text-align: right;
    }
  }

  .message-inline {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;

    .message-profile {
      align-self: flex-end;
      display: inline-block;
      margin-left: 4px;
      margin-bottom: 2px;

      .avatar.avatar-lg {
        width: 30px;
        height: 30px;
        font-size: 15px;
      }
    }

    .message-content {
      white-space: pre-wrap;
      text-align: left;
      margin: 0 4px;
      padding: 3px 6px;
      border-radius: 18px;
      color: black;
      // TODO: If the word is over a certain number of characters, enable break all...
      word-break: normal;
      background-color: #f1f3f4;
    }
  }
}

// Show your sent messages on the right
.message.sent {
  width: 100%;
  .message-inline {
    flex-direction: row-reverse;
    .message-content {
      margin-left: 25%;
      background-color: #d2e3fc;
    }
  }
}
</style>
