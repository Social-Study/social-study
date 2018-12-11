<template>
  <div class="off-canvas off-canvas-sidebar-show">
    <!-- off-screen toggle button -->
    <a
      @click="sidebarActive = true"
      class="off-canvas-toggle btn btn-primary btn-action"
    >
      <i class="icon icon-menu"></i>
    </a>

    <div
      id="sidebar-id"
      class="off-canvas-sidebar"
      :class="{ active : sidebarActive }"
    >
      <ul class="menu sidebar">
        <li
          class="menu-item"
          style="padding-top: 10px;"
        >
          <div class="tile tile-centered">
            <div class="tile-content">
              <h5>{{studyGroup.className}}</h5>
              <p style="margin: 0;">{{studyGroup.instructorName}}</p>
            </div>
          </div>
        </li>
        <li class="divider"></li>
        <li class="menu-item">
        </li>
        <li class="menu-item text-left"><a class="active">Home</a></li>
        <li class="menu-item text-left"><a>Flashcards</a></li>
        <li class="menu-item text-left"><a>Quiz</a></li>
        <li class="menu-item text-left"><a>Agenda</a></li>
        <li class="menu-item text-left"><a>Notes</a></li>
        <li class="menu-item text-left">
          <div class="menu-badge">
            <label class="member-num label label-primary">{{studyGroup.members.length}}</label>
          </div><a>Members</a>
        </li>
      </ul>
    </div>

    <a
      @click="sidebarActive = false"
      class="off-canvas-overlay"
    ></a>

    <div class="off-canvas-content">
      <!-- Slot where all other page content will be inserted -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  props: {
    studyGroup: Object
  },
  data() {
    return {
      sidebarActive: false
    };
  }
};
</script>
