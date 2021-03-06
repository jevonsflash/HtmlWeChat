<template>
  <div id="list">
    <div class="search-frame">
      <header>
        <div class="search">
          <i class="el-icon-search" />
          <span>搜索</span>
        </div>
        <div class="add">
          <i class="el-icon-plus" @click="addChat"></i>
        </div>
      </header>
    </div>
    <el-scrollbar class="list-container">
      <el-row>
        <el-col :span="24" v-for="(chat, index) in chats" :key="index">
          <div
            @click="changeChat(chat.id)"
            @contextmenu.prevent="onContextMenu"
            :class="{ active: nowChat && nowChat.id == chat.id, item: true }"
          >
            <div class="grid" v-if="isArray(chat.avatar)">
              <img
                v-for="(item, index) in chat.avatar"
                :key="index"
                class="block"
                :src="item"
              />
            </div>
            <div v-else>
              <img :src="chat.avatar" />
            </div>

            <div class="meta">
              <div class="top">
                <span class="name">{{ chat.user }}</span>
                <span class="time">{{
                  getLastMsg(chat).time | moment("HH:mm")
                }}</span>
              </div>
              <div class="last_msg">{{ msgContentText(getLastMsg(chat)) }}</div>
            </div>
          </div>

          <context-menu
            ref="chatContextMenu"
            :context-menu-show.sync="contextShow"
            :config="contextConfig"
            @onTop="onTop"
            @setUnread="setUnread"
            @noBother="noBother"
            @disable="disable"
            @removeChat="removeChat"
          >
          </context-menu>
        </el-col> </el-row
    ></el-scrollbar>

    <dialog-add-group-chat :event="add_chat_event"></dialog-add-group-chat>
  </div>
</template>


<script lang='ts'>
import EventEmitter from "eventemitter3";
import dayjs from "dayjs";
import constant from "@/constant";
import { mapGetters, mapMutations } from "vuex";
import DialogAddGroupChat from "@/components/dialogs/add_group_contact.vue";
import contextMenu from "@/components/contextMenu/index.vue";
import Vue from "vue";

export default Vue.extend({
  components: {
    DialogAddGroupChat,
    contextMenu,
  },
  computed: {
    ...mapGetters(["chats", "nowChat"]),
  },
  data() {
    return {
      add_chat_event: null,
      visible: false,
      contextShow: false,
      osComponentOptions: {
        resize: "none",
        paddingAbsolute: true,
        scrollbars: {
          autoHide: "never",
          clickScrolling: true,
        },
      },
      contextConfig: {
        // 右键点击距左位置
        offsetLeft: 0,
        // 右键点击距上位置
        offsetTop: 0,
        width: 148,
        menuList: [
          // 无需按键监听可以不传keyCode
          { label: "置顶", id: 1, emitType: "onTop" },
          { label: "标为未读", id: 2, emitType: "setUnread" },
          { label: "消息免打扰", id: 3, emitType: "noBother" },
          {
            label: "在独立窗口中打开",
            id: 4,
            emitType: "openInIndependentWindow",
          },
          { label: "不显示聊天", id: 5, emitType: "disable" },
          { label: "删除聊天", id: 6, emitType: "removeChat" },
        ],
      },
    };
  },

  created() {
    this.add_chat_event = new EventEmitter();
  },
  methods: {
    ...mapMutations(["changeChat", "delChat"]),

    isArray(obj) {
      var result = obj instanceof Array;
      return result;
    },

    onTop() {
      console.log("onTop");
      this.contextShow = false;
    },
    setUnread() {
      console.log("setUnread");
    },
    noBother() {
      console.log("noBother");
    },
    openInIndependentWindow() {
      console.log("openInIndependentWindow");
    },
    disable() {
      console.log("disable");
    },
    removeChat() {
      this.delChat(this.nowChat.id);
      this.contextShow = false;
    },

    onContextMenu({ clientX, clientY }) {
      Object.assign(this, {
        contextConfig: {
          offsetLeft: clientX,
          offsetTop: clientY,
        },
        contextShow: true,
      });
    },

    getLastMsg(chat) {
      for (let i = chat.msgs.length - 1; i >= 0; i--) {
        if (chat.msgs[i].type) {
          return chat.msgs[i];
        }
      }
      return {
        type: constant.MSG_TYPE_TEXT,
        data: "暂无消息",
        time: dayjs().format(),
      };
    },
    msgContentText(last_msg) {
      switch (last_msg.type) {
        case constant.MSG_TYPE_TEXT:
          return last_msg.data;
        case constant.MSG_TYPE_IMG:
          return "[图片]";
        case constant.MSG_TYPE_TRANSFER:
          return "[转账]";
        case constant.MSG_TYPE_VOICE:
          return "[语音]";
        case constant.MSG_TYPE_VIDEO:
          return "[视频]";
        case constant.MSG_TYPE_FILE:
          return "[文件]";
        case constant.MSG_TYPE_VIDEO_CALL:
          return "[视频聊天]";
        case constant.MSG_TYPE_VOICE_CALL:
          return "[语音聊天]";
      }
    },
    addChat() {
      this.add_chat_event.emit("open");
    },
    rowDialogClose() {
      this.visible = false;
    },

    onOpen() {
      this.visible = true;
    },
  },
});
</script>

<style scoped lang="scss">
#list {
  width: 100%;
  height: 100%;
  background-color: #ebe8e7;
  display: flex;
  flex-direction: column;
  .search-frame {
    background-color: rgb(247, 247, 247);
    border-right: 1px solid #e5e5e5;
  }
  header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 25px;
    margin-bottom: 10px;
    .search {
      height: 25px;
      width: 190px;
      margin-right: 10px;
      background-color: #dbd9d8;
      display: flex;
      align-items: center;
      border-radius: 5px;
      .icon-sreach {
        margin: 0 8px;
      }
      i {
        font-size: 12px;
        margin: 0 5px;
      }
      span {
        font-size: 13px;
        color: #6c6a6a;
      }
    }
    .add {
      border-radius: 5px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 25px;
      width: 25px;
      background-color: #dbd9d8;
    }
  }
  .list-container {
    width: 267px;
    height: 100%;
    .grid {
      position: relative;
      display: grid;
      height: 40px;
      width: 40px;
      grid-template-columns: repeat(auto-fill, 13px);
      margin-right: 13px;
      .block {
        flex: 1;
        display: flex;
        flex-direction: column;
        flex-grow: 0;
        height: 12px;
        width: 12px;
      }
    }

    .item {
      padding: 13px;
      display: flex;
      align-items: center;
      img {
        width: 40px;
        height: 40px;
        border-radius: 2px;
        margin-right: 13px;
      }
      .meta {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .top {
          width: 100%;
          display: flex;
          justify-content: space-between;
          .name {
            font-size: 14px;
            font-weight: bold;
          }
          .time {
            color: #9c9a9a;
            font-size: 12px;
          }
        }
        .last_msg {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-top: 4px;
          font-size: 12px;
          width: 160px;
          color: #6c6a6a;
        }
      }
    }
    .item:hover:not(.active) {
      background-color: #dfdcdb;
    }
    .active {
      background-color: #c6c5c5;
    }
  }
}
</style>