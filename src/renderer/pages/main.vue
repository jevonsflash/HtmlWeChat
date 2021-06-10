<template>
  <div id="main">
    <el-container class="main-container">
      <el-aside class="frame" width="60px">
        <Nav @onPannelSwitched="onPannelSwitched"></Nav>
      </el-aside>
      <el-main class="main-frame" >
        
        <chat v-if="currentPannel == 'chat'"></chat>
        <contacts v-if="currentPannel == 'contacts'"></contacts>
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
import Vue from "vue";
const ipcRenderer = require("electron").ipcRenderer;

export default Vue.extend({
  components: {
    Nav,
    Chat,
    Contacts,
    Setting
  },

  data() {
    return {
      currentPannel: "",
    };
  },
  created() {
    this.currentPannel = "chat";
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