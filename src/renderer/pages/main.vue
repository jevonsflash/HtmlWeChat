<template>
  <div id="main">
    <el-container class="main-container">
      <el-aside class="frame" width="60px">
        <Nav @onPannelSwitched="onPannelSwitched" @goto="onGoto"></Nav>

        <el-popover
          style="background-color: red"
          ref="popframe"
          :offset="460"
          :visible-arrow="false"
          placement="right"
          width="300"
          v-model="visible.miniprograme"
          trigger="manual"
          popper-class="popover-frame"
        >
          <miniprograme></miniprograme>

          <div class="miniprograme-frame" slot="reference"></div>
        </el-popover>
        <el-popover
          ref="popframe"
          :offset="460"
          :visible-arrow="false"
          placement="right"
          width="250"
          v-model="visible.phone"
          trigger="manual"
          popper-class="popover-frame"
        >
          <phone></phone>

          <div class="miniprograme-frame" slot="reference"></div>
        </el-popover>
        <el-popover
          ref="popframe"
          :offset="460"
          :visible-arrow="false"
          placement="right"
          width="150"
          v-model="visible.menu"
          trigger="manual"
          popper-class="popover-frame"
        >
          <Menu></Menu>

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
    Menu,
    Phone,
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

      if (page == "miniprograme") {
        this.visible.miniprograme = !this.visible.miniprograme;
        this.visible.menu = false;
        this.visible.phone = false;
      } else if (page == "menu") {
        this.visible.menu = !this.visible.menu;
        this.visible.miniprograme = false;

        this.visible.phone = false;
      } else if (page == "phone") {
        this.visible.phone = !this.visible.phone;
        this.visible.miniprograme = false;
        this.visible.menu = false;
      }
    },

    onPannelSwitched: function (currentPannel) {
      this.currentPannel = currentPannel;
    },
  },
});
</script>

<style lang="scss" scoped>
#main {
  width: 100%;
  height: 100%;
  .miniprograme-frame {
    background-color: red;
    width: 0;
    position: absolute;
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
<style lang="scss">
.popover-frame {
  padding: 0 !important;
}
</style>