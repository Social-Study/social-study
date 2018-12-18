<template>
  <div
    v-if="!sender"
    class="message"
  >
    <p class="message-sender">{{details.displayName}}</p>
    <div class="message-inline">
      <div class="message-profile">
        <Avatar :user="{photoURL: details.photoURL, displayName: details.displayName}" />
      </div>
      <p class="message-content">{{details.message}}</p>
    </div>
  </div>
  <div
    v-else
    class="message sent"
  >
    <div class="message-inline">
      <p class="message-content">{{details.message}}</p>
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
    sender: {
      type: Boolean,
      default: false
    },
    details: Object
  }
};
</script>


<style lang="scss" scoped>
.message {
  margin-bottom: 5px;
  max-width: 300px;

  .message-sender {
    text-align: left;
    color: darkgrey;
    margin: 0 45px;
    font-size: 12px;
  }

  .message-inline {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    .message-profile {
      align-self: flex-end;
      display: inline-block;
      margin-left: 2px;
      margin-bottom: 2px;

      .avatar.avatar-lg {
        width: 30px;
        height: 30px;
        font-size: 15px;
      }
    }

    .message-content {
      text-align: left;
      margin: 0 4px;
      display: inline-block;
      padding: 3px 6px;
      border-radius: 16px;
      // margin-left: 10px;
      color: black;
      word-break: break-all;
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
      margin-left: 35px;
      background-color: #d2e3fc;
    }
  }
}
</style>
