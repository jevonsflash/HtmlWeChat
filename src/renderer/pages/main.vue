<template>
  <div id="main">
    <el-container class="main-container">
      <el-aside class="frame" width="60px">
        <Nav @onPannelSwitched="onPannelSwitched"></Nav>
      </el-aside>
      <el-main class="frame">
        <chat v-if="currentPannel == 'chat'"></chat>
        <contacts v-if="currentPannel == 'contacts'"></contacts>
      </el-main>
      <el-main class="sub-frame">
        <transition name="slide-fade">
          <div v-show="show3">
            <h1>Building</h1>
          </div></transition
        >
      </el-main>
    </el-container>
  </div>
</template>

<script lang='ts'>
import Nav from "@/components/nav.vue";
import Chat from "@/components/chat/index.vue";
import Contacts from "@/components/contacts/index.vue";
import Vue from "vue";
const ipcRenderer = require("electron").ipcRenderer;

export default Vue.extend({
  components: {
    Nav,
    Chat,
    Contacts,
  },

  data() {
    return {
      show3: true,
      currentPannel: "",
    };
  },
  created() {
    this.currentPannel = "chat";
    ipcRenderer.on("shrink_main_window", (event, _) => {
      this.show3 = false;
    });
    ipcRenderer.on("expand_main_window", (event, _) => {
      this.show3 = true;
    });
  },
  methods: {
    onPannelSwitched: function (currentPannel) {
      this.currentPannel = currentPannel;
    },
  },
});
</script>

<style scoped lang="scss">
#main {
  width: 100%;
  height: 100%;
  .main-container {
    height: 100%;
  }
  .frame {
    overflow-x: hidden;
    padding: 0;
  }
  .slide-fade-enter-active {
    transition: all 0.3s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.8s ease;
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateX(-100px);
  }
}
</style>