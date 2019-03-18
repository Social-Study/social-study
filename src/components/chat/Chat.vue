<template>
  <div>
    <div class="sidebar" :class="show ? 'active' : 'collapsed'">
      <div class="content">
        <h3 id="header">Study Group Chat</h3>
        <div class="divider-gradient mb-2"></div>
        <div ref="messages" class="messages">
          <transition-group
            name="chatTransition"
            enter-active-class="animated fadeInDown"
          >
            <message
              v-for="message in groupMessages"
              :key="message.date.toString()"
              :sender="message.sender === $store.getters.uid ? true : false"
              :details="message"
            ></message>
          </transition-group>
        </div>
        <div class="divider-gradient my-2"></div>
        <input
          v-model="userMessage"
          type="text"
          class="form-input message-input"
          placeholder="Group Message"
          @keydown.enter="sendMessage"
        />
        <button
          class="btn btn-primary"
          :class="userMessage === '' ? 'disabled' : ''"
          @click="sendMessage"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Message from "@/components/chat/Message";
import { db } from "@/firebaseConfig";

let notification = new Audio(
  "https://notificationsounds.com/soundfiles/4e4b5fbbbb602b6d35bea8460aa8f8e5/file-sounds-1096-light.mp3"
);

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
  computed: {
    messageLength() {
      return this.groupMessages.length;
    }
  },
  watch: {
    // Reload the group's messages when the user switches groups
    "$route.params.groupID"() {
      this.loadGroupMessages();
    },
    messageLength(newVal, oldVal) {
      // Only play notification when message is from another person
      // Only play notification when the chat sidebar is closed
      // Only play notification when the user gets a new message, not when the messages are loaded
      if (
        oldVal !== 0 &&
        newVal !== 0 &&
        this.groupMessages[this.groupMessages.length - 1].sender !==
          this.$store.getters.uid
      ) {
        if (!this.$store.getters.chatActive) {
          notification.play();
        } else {
          // Have to adjust the time depending on the speed of message animation
          setTimeout(() => {
            this.scrollToBottom(); //Always scroll to bottom when a new message comes in
          }, 500);
        }
      }
    }
  },
  created() {
    this.loadGroupMessages();
  },
  methods: {
    scrollToBottom() {
      this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight;
    },
    sendMessage() {
      if (this.userMessage !== "") {
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
        this.userMessage = "";
      }
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
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles.scss";

// Chat sidebar header
#header {
  display: block;
  transition: 0.25s;
  margin-bottom: 9px;
}

.sidebar {
  color: white;
  height: $content-height;
  width: 0;
  position: absolute;
  z-index: 0;
  top: $nav-height;
  right: 0;
  background-color: $dark;
  overflow-x: hidden;
  transition: 0.25s;
  padding-top: 10px;

  // Content is the flex container that holds everything
  .content {
    height: 100%;
    min-width: 300px;
    max-width: 300px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
  }
}

.divider-gradient {
  background-image: $orange-gradient;
  height: 1px;
}

// Messages container
.messages {
  flex: 5;
  overflow-y: auto;
}

.message-input {
  resize: none;
}

.collapsed {
  width: 0;
  transition: 0.25s;
}

.text {
  display: block;
  transition: 0.25s;
}

.active {
  width: 300px;
}
</style>
