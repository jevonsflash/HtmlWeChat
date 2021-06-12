<template>
  <div id="main">
    <el-container class="main-container">
      <el-aside class="frame" width="60px">
        <Nav @onPannelSwitched="onPannelSwitched" @goto="onGoto"></Nav>

        <el-popover
        style="background-color:red"
          ref="popframe"
          :offset="400"
          
          placement="right"
          width="400"
          v-model="visible.miniprograme"
          trigger="manual"
        >
          <miniprograme></miniprograme>

          <div class="miniprograme-frame" slot="reference"></div>
        </el-popover>
           <el-popover
          ref="popframe"
  
          placement="right"
          width="400"
          v-model="visible.phone"
          trigger="manual"
        >
          <phone></phone>

          <div class="miniprograme-frame" slot="reference"></div>
        </el-popover>
           <el-popover
          ref="popframe"
       
          placement="right"
          width="400"
          v-model="visible.menu"
          trigger="manual"
        >
          <menu></menu>

          <div class="miniprograme-frame" slot="reference"></div>
        </el-popover>
      </el-aside>
      <el-main class="main-frame">
        <chat v-if="currentPannel == 'chat'"></chat>
        <contacts v-if="currentPannel == 'contacts'"></contacts>
        <favourite v-if="currentPannel == 'app'"></favourite>
        <setting v-if="currentPannel == 'setting'"></setting>
      </el-main>
    </el-container>
  </div>
</template>

<script lang='ts'>
import Nav from "@/components/nav.vue";
import Chat from "@/components/chat/index.vue";
import Contacts from "@/components/contacts/index.vue";
import Setting from "@/components/setting/index.vue";
import Favourite from "@/components/favourite/index.vue";
import Miniprograme from "@/components/miniprograme/index.vue";
import Phone from "@/components/phone/index.vue";
import Menu from "@/components/menu/index.vue";
import Vue from "vue";
const ipcRenderer = require("electron").ipcRenderer;

export default Vue.extend({
  components: {
    Nav,
    Chat,
    Contacts,
    Setting,
    Favourite,
    Miniprograme,
  },

  data() {
    return {
      visible: {
        miniprograme: false,
        menu: false,
        phone: false,
      },
      currentPannel: "",
    };
  },
  created() {
    this.currentPannel = "chat";
  },
  methods: {
    onGoto(page) {
      this.visible.miniprograme = false;
      this.visible.menu = false;
      this.visible.phone = false;
      if (page == "miniprograme") {
        this.visible.miniprograme = true;
      } else if (page == "menu") {
        this.visible.menu = true;
      } else if (page == "phone") {
        this.visible.phone = true;
      }
    },

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
  .miniprograme-frame {
    background-color: red;
    width: 0;
    position:absolute;
    left: 60px;
    height: 100%;
    top: 0;
    clear: both;

  }
  
  .main-container {
    height: 100%;
  }
  .frame {
    overflow-x: hidden;
    padding: 0;
  }

  .main-frame {
    width: 100%;
    float: left;
    display: inherit;
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