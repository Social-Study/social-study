<template>
  <div>
    <div
      class="sidebar"
      :class="show ? 'active' : 'collapsed'"
    >
      <div class="content">
        <h3 id="header">Study Group Chat</h3>
        <div class="divider"></div>
        <div
          class="messages"
          ref="messages"
        >
          <transition-group
            enter-active-class="animated fadeInDown"
            leave-active-class="animated fadeOutUp"
          >
            <message
              v-for="message in groupMessages"
              :key="message.date.toString()"
              :sender="message.sender === $store.getters.uid ? true: false"
              :details="message"
            ></message>
          </transition-group>

        </div>
        <div class="divider"></div>
        <textarea
          @keydown.ctrl.enter="sendMessage"
          class="message-input"
          placeholder="Group message"
          v-model="userMessage"
          cols="30"
          rows="2"
        ></textarea>
        <!-- TODO: Disable button if field is blank -->
        <button
          @click="sendMessage()"
          class="btn btn-primary"
          :class="userMessage === '' ? 'disabled' : ''"
        >Send</button>
      </div>

    </div>
  </div>

</template>

<script>
import Message from "@/components/Message";
import firebase, { db } from "@/firebaseConfig";
import { log } from "util";

export default {
  name: "Chat",
  components: {
    Message
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      userMessage: "",
      groupMessages: []
    };
  },
  methods: {
    scrollToBottom() {
      this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight;
    },
    sendMessage() {
      db.collection("study-groups")
        .doc(this.$route.params.groupID)
        .collection("messages")
        .add({
          date: new Date(),
          displayName: this.user.displayName,
          message: this.userMessage,
          photoURL: this.user.photoURL,
          sender: this.$store.getters.uid
        })
        .then(() => {
          this.scrollToBottom();
        });
    },
    loadGroupMessages() {
      this.$bind(
        "groupMessages",
        db
          .collection("study-groups")
          .doc(this.$route.params.groupID)
          .collection("messages")
          .orderBy("date", "asc")
      ).then(groupMessages => {
        this.groupMessages === groupMessages;
        this.scrollToBottom();
      });
    }
  },
  created() {
    this.loadGroupMessages();
  },
  watch: {
    // Reload the group's messages when the user switches groups
    "$route.params.groupID"(id) {
      this.loadGroupMessages();
    }
  }
};
</script>

<style lang="scss" scoped>
// Chat sidebar header
#header {
  display: block;
  transition: 1s;
  // flex: 0;
}

.sidebar {
  color: white;
  height: 100%;
  width: 0;
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  background-color: #3c3c3c;
  overflow-x: hidden;
  transition: 1s;
  padding-top: 10px;

  // Content is the flex container that holds everything
  .content {
    height: 100%;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
  }
}

// Messages container
.messages {
  flex: 5;
  overflow-y: auto;
}

.message-input {
  // margin: 10px;
  resize: none;
}

.collapsed {
  width: 0;
  transition: 1s;
}

.text {
  display: block;
  transition: 1s;
}

.active {
  width: 300px;
}
</style>
