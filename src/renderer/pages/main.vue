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
    </el-container>
  </div>
</template>

<script lang='ts'>
import Nav from "@/components/nav.vue";
import Chat from "@/components/chat/index.vue";
import Contacts from "@/components/contacts/index.vue";
import Vue from "vue";

export default Vue.extend({
  components: {
    Nav,
    Chat,
    Contacts,
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
}
</style>