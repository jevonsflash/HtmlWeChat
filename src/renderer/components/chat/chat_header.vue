<template>
  <div id="chat_header">
    <div class="name" style="-webkit-app-region: no-drag">
      <div @click="changeUser(constant.MSG_FROM_OPPOSITE)">
        {{ nowChat.user }}
      </div>
    </div>
    <div class="actions" style="-webkit-app-region: no-drag">
      <div class="toolbar">
        <div>
          <svg-icon name="fixaction"></svg-icon>
        </div>
        <div>
          <svg-icon name="min" @click="minus"></svg-icon>
        </div>
        <div>
          <svg-icon name="max"></svg-icon>
        </div>
        <div>
          <svg-icon name="close" @click="cross"></svg-icon>
        </div>
      </div>
      <div class="more">
        <svg-icon name="more" @click="showMore = !showMore"></svg-icon>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import EventEmitter from "eventemitter3";
import constant from "@/constant";
import { Message } from "element-ui";
import { mapGetters, mapMutations } from "vuex";
const ipcRenderer = require("electron").ipcRenderer;

import Vue from "vue";

export default Vue.extend({
  computed: {
    ...mapGetters(["nowChat"]),
  },
  watch: {
    showMore: function (newshowMore, oldshowMore) {
      if (newshowMore) {
        ipcRenderer.send("expand_main_window");
      } else {
        ipcRenderer.send("shrink_main_window");
      }
    },
  },
  data() {
    return {
      showMore: false,
    };
  },

  methods: {
    ...mapMutations(["changeNowUser"]),
    minus() {
      ipcRenderer.send("window-min");
    },
    cross() {
      this.$store.commit("close");
    },
    changeUser(user) {
      this.changeNowUser(user);
      if (user == constant.MSG_FROM_SELF) {
        Message.success(`已切换为自己`);
      } else {
        Message.success(`已切换为对方`);
      }
    },
  },
});
</script>

<style scoped lang="scss">
#chat_header {
  height: 100%;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 15px;
  .name {
    cursor: pointer;
    margin: 0 15px;
    font-size: 18px;
    font-weight: 580;
    color: black;
  }
  .actions {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    .toolbar {
      display: flex;
      div {
        width: 34px;
        height: 26px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        cursor: pointer;
      }
      div:hover {
        background-color: #dfdfdf;
      }
    }

    .more {
      .icon-more {
        cursor: pointer;
        font-size: 24px;
      }
      height: 30px;
      width: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>