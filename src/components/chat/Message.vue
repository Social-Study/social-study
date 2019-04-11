<!-- SCI ID: 037 -->
<!-- Name: Message -->
<!-- Version: 1.0 -->
<template>
  <!-- Messages from other members -->
  <div
    v-if="!sender"
    class="message"
    @click="showDate = !showDate"
  >
    <div id="details-container">
      <!-- Only show the sender's name if they didn't send the previous message -->
      <div
        v-if="showName"
        class="message-sender"
      >
        {{ details.displayName }}
      </div>
      <transition
        name="dateTransition"
        enter-active-class="animated fadeIn slow"
        leave-active-class="animated fadeOut"
      >
        >
        <div
          v-show="showDate"
          class="message-date"
        >{{ getSent }}</div>
      </transition>
    </div>
    <div class="message-inline">
      <div class="message-profile">
        <!-- Only show sender avatar if they didn't send the previous message -->
        <Avatar
          v-if="showName"
          :user="{
            photoURL: details.photoURL,
            displayName: details.displayName
          }"
        />
      </div>
      <!-- When the avatar is not displayed, add a margin of the same size -->
      <p
        class="message-content"
        :class="showName ? '' : 'add-space'"
      > {{ details.message }} </p>
    </div>
  </div>

  <!-- Messages from logged-in user -->
  <div
    v-else
    class="message sent"
    @click="showDate = !showDate"
  >
    <div id="details-container">
      <transition
        name="dateTransition"
        enter-active-class="animated fadeIn slow"
        leave-active-class="animated fadeOut"
      >
        <div
          v-show="showDate"
          class="message-date"
        >{{ getSent }}</div>
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
  props: {
    /**
     * Denotes if the current user is the message sender.
     * If they are the message is shown on the right.
     */
    sender: {
      type: Boolean,
      default: false
    },
    /**
     * The message's details
     */
    details: {
      type: Object,
      default: null
    },
    /**
     * Whether or not the avatar and name should be shown with the message.
     * Only show the avatar and name for the first message in a chain of messages
     */
    showName: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      showDate: false
    };
  },
  computed: {
    // TODO: Maybe use date-fns to compute this?
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

    .message-content.add-space {
      margin-left: 36px;
    }

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
      border-radius: 14px;
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
