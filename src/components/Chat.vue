<template>
  <div>
    <div
      class="sidebar"
      :class="show ? 'active' : 'collapsed'"
    >
      <div class="content">
        <h3 id="header">Study Group Chat</h3>
        <div class="divider"></div>
        <div class="messages">
          <div class="message">
            <p class="message-sender">Kevin Meizanis</p>
            <div class="message-inline">
              <img
                class="message-profile"
                src="https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.ZzK9QmxgtHFysccpbohqYAHaHa%26pid%3D15.1&f=1"
              >
              <p class="message-content">Gang Gang. This is a really fucking long message. Hopefully it shows up properly btw</p>
            </div>
          </div>
          <div class="message">
            <p class="message-sender">Kevin Meizanis</p>
            <div class="message-inline">
              <img
                class="message-profile"
                src="https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.ZzK9QmxgtHFysccpbohqYAHaHa%26pid%3D15.1&f=1"
              >
              <p class="message-content">Gang Gang.</p>
            </div>
          </div>
          <div class="message sent">
            <!-- <p class="message-sender">Evan Buss</p> -->
            <div class="message-inline">
              <!-- <img
                class="message-profile"
                src="https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.ZzK9QmxgtHFysccpbohqYAHaHa%26pid%3D15.1&f=1"
              > -->
              <p class="message-content">Hello Big Kev</p>
            </div>
          </div>
        </div>
        <div class="divider"></div>
        <textarea
          class="message-input"
          name=""
          id=""
          cols="30"
          rows="4"
        ></textarea>
        <button class="btn btn-primary">Send</button>
      </div>

    </div>
  </div>

</template>

<script>
export default {
  name: "Chat",
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
// Chat sidebar header
#header {
  display: block;
  transition: 1s;
  flex: 0;
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

// Show other user's messages on the left, next to their profile picture
.message {
  margin-bottom: 5px;

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
      width: 30px;
      height: 30px;
      border-radius: 50%;
      align-self: flex-end;
      display: inline-block;
    }
    .message-content {
      text-align: left;
      margin: 0 4px;
      display: inline-block;
      padding: 2px 6px;
      border-radius: 16px;
      color: black;
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
      float: right;
      background-color: #d2e3fc;
    }
  }
}

.message-input {
  margin: 10px;
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
