<template>
  <div id="nav">
    <div class="avatar">
      <el-popover width="300" :visible-arrow="false" trigger="click">
        <contact-detail :msg="self"> </contact-detail>
        <span slot="reference">
          <img :src="self.avatar" alt="" />
        </span>
      </el-popover>
    </div>

    <div>
      <div class="tab-frame">
        <el-row v-for="(item, index) in tabButtons" :key="index">
          <el-col :span="24">
            <img
              @mouseenter="changeImgSrc($event, true)"
              @mouseleave="changeImgSrc($event, false)"
              :src="currentPannel === item.pannel ? item.url2 : item.url"
              :name="item.name"
              @click="switchPannel(item.pannel)"
              width="20"
              height="20"
          /></el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <img
              src="@/assets/nav/file_deactive.png"
              @click="goTo('file')"
              width="20"
              height="20"
          /></el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <img
              src="@/assets/nav/look.png"
              @click="goTo('look')"
              width="20"
              height="20"
          /></el-col>
        </el-row>
      </div>
      <div class="setting-frame">
        <el-row v-for="(item, index) in settingButtons" :key="index">
          <el-col :span="24">
            <img
              @mouseenter="changeImgSrc($event, true)"
              @mouseleave="changeImgSrc($event, false)"
              :src="currentPannel === item.pannel ? item.url2 : item.url"
              :name="item.name"
              @click="goTo(item.pannel)"
              width="20"
              height="20"
          /></el-col>
        </el-row>
      </div>
    </div>
    <dialog-change-self-info
      :event="edit_contact_event"
      :msg="self"
    ></dialog-change-self-info>
  </div>
</template>

<script lang='ts'>
import EventEmitter from "eventemitter3";
import constant from "@/constant";
import DialogChangeSelfInfo from "@/components/dialogs/change_self_info.vue";
import ContactDetail from "@/components/dialogs/contact_detail.vue";
import { mapGetters, mapMutations } from "vuex";
import Vue from "vue";
export default Vue.extend({
  components: {
    DialogChangeSelfInfo,
    ContactDetail,
  },
  computed: {
    ...mapGetters(["self"]),
  },
  data() {
    return {
      edit_contact_event: null,

      tabButtons: [
        {
          url: require("@/assets/nav/chat_deactive.png"),
          url2: require("@/assets/nav/chat_active.png"),
          name: "chat",
          pannel: "chat",
        },
        {
          url: require("@/assets/nav/contacts_deactive.png"),
          url2: require("@/assets/nav/contacts_active.png"),
          name: "contacts",
          pannel: "contacts",
        },
        {
          url: require("@/assets/nav/app_deactive.png"),
          url2: require("@/assets/nav/app_active.png"),
          name: "app",
          pannel: "app",
        },
        // {
        //   url: require("@/assets/nav/file_deactive.png"),
        //   url2: require("@/assets/nav/file_active.png"),
        //   name: "file",
        //   pannel: "file",
        // },
      ],
      settingButtons: [
        {
          url: require("@/assets/nav/miniprograme.png"),
          url2: require("@/assets/nav/miniprograme.png"),
          name: "miniprograme",
          pannel: "miniprograme",
        },
        {
          url: require("@/assets/nav/phone.png"),
          url2: require("@/assets/nav/phone.png"),
          name: "phone",
          pannel: "phone",
        },
        {
          url: require("@/assets/nav/menu.png"),
          url2: require("@/assets/nav/menu.png"),
          name: "menu",
          pannel: "menu",
        },
      ],
      currentPannel: "chat",
      constant: constant,
      chat_manage_event: null,
    };
  },

  destroyed() {
    // 在组件生命周期结束的时候销毁。
    window.removeEventListener("keydown", this.receiveMessage, false);
    this.$globalEvent.removeAllListeners("switch-pannel");
  },
  created() {
    this.$globalEvent.on("switch-pannel", this.switchPannel);

    this.chat_manage_event = new EventEmitter();
    this.edit_contact_event = new EventEmitter();
    window.addEventListener("keydown", this.receiveMessage);
  },
  methods: {
    receiveMessage(e) {
      //Ctrl+B
      if (e.ctrlKey && e.keyCode == 66) {
        this.editSelf();
      }
    },

    goTo(page) {
      console.log("goto" + page);
      this.$emit("goto", page);
    },
    changeImgSrc(event, isEnter) {
      var element = undefined;
      if (isEnter) {
        element = event.fromElement;
      } else {
        element = event.toElement;
      }
    },

    switchPannel(pannel) {
      this.currentPannel = pannel;
      this.$emit("onPannelSwitched", this.currentPannel);
      console.log(pannel);
    },

    editSelf() {
      this.edit_contact_event.emit("open");
    },
  },
});
</script>

<style scoped lang="scss">
#nav {
  width: 100%;
  height: 100%;
  background: linear-gradient(#29292c, #2a2a2a);
  display: flex;
  flex-direction: column;
  align-items: center;
  .avatar {
    cursor: pointer;
    width: 35px;
    height: 35px;
    margin-top: 36px;
    img {
      border-radius: 2px;
      width: 100%;
      height: 100%;
    }
  }

  .active {
    fill: green;
  }

  .de-active {
    fill: gray;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .tab-frame {
    margin-top: 32px;
  }
  .setting-frame {
    position: absolute;
    bottom: 10px;
  }
}
</style>