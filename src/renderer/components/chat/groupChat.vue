<template>
  <el-container id="chat">
    <el-main class="frame">
      <chat-header
        :title="nowChats.user"
        ref="chatHeader"
        class="header"
        style="-webkit-app-region: drag"
        @onShowMore="onShowMore"
      >
      </chat-header>

      <div class="body">
        <div class="window" ref="chatWindow">
          <div
            class="message"
            v-for="(chatItem, index) in getNowChat()"
            :key="index"
          >
            <div
              class="sys_msg"
              v-if="chatItem.msg.from == constant.MSG_FROM_SYSTEM"
            >
              <span>{{ chatItem.msg.data }}</span>
            </div>
            <div
              v-else
              @contextmenu.prevent="onContextMenu"
              :class="getClass(chatItem.msg.from)"
            >
              <el-popover placement="bottom" width="300" trigger="click">
                <contact-detail :msg="chatItem"></contact-detail>
                <img
                  slot="reference"
                  @click="showDetail(chatItem)"
                  v-if="chatItem.msg.from != constant.MSG_FROM_SELF"
                  :src="chatItem.avatar"
                  alt=""
                />
              </el-popover>

              <!-- 文字消息 -->
              <message-text
                v-if="chatItem.msg.type == constant.MSG_TYPE_TEXT"
                :direction="chatItem.msg.from"
                :msg="chatItem.msg.data"
              ></message-text>

              <!-- 图片消息 -->
              <div v-else-if="chatItem.msg.type == constant.MSG_TYPE_IMG">
                <message-img-l
                  v-if="chatItem.msg.from != constant.MSG_FROM_SELF"
                  :src="chatItem.msg.data"
                ></message-img-l>
                <message-img-r v-else :src="chatItem.msg.data"></message-img-r>
              </div>
              <!-- 视频消息 -->
              <div v-else-if="chatItem.msg.type == constant.MSG_TYPE_VIDEO">
                <message-video-l
                  v-if="chatItem.msg.from != constant.MSG_FROM_SELF"
                  :data="chatItem.msg.data"
                ></message-video-l>
                <message-video-r
                  v-else
                  :data="chatItem.msg.data"
                ></message-video-r>
              </div>
              <!-- 转账消息 -->
              <message-transfer
                @click.native="openTransferWindow(msg)"
                v-else-if="chatItem.msg.type == constant.MSG_TYPE_TRANSFER"
                :direction="chatItem.msg.from"
                :data="chatItem.msg.data"
              ></message-transfer>

              <!-- 语言消息 -->
              <message-voice
                v-else-if="chatItem.msg.type == constant.MSG_TYPE_VOICE"
                :direction="chatItem.msg.from"
                :data="chatItem.msg.data"
              ></message-voice>

              <!-- 文件消息 -->
              <message-file
                v-else-if="chatItem.msg.type == constant.MSG_TYPE_FILE"
                :direction="chatItem.msg.from"
                :data="chatItem.msg.data"
              ></message-file>

              <!-- 语音通话消息 -->
              <message-call-voice
                v-else-if="chatItem.msg.type == constant.MSG_TYPE_VOICE_CALL"
                :direction="chatItem.msg.from"
                :data="chatItem.msg.data"
              ></message-call-voice>

              <!-- 视频通话消息 -->
              <message-call-video
                v-else-if="chatItem.msg.type == constant.MSG_TYPE_VIDEO_CALL"
                :direction="chatItem.msg.from"
                :data="chatItem.msg.data"
              ></message-call-video>
              <el-popover placement="bottom" width="300" trigger="click">
                <contact-detail :msg="chatItem"></contact-detail>
                <img
                  slot="reference"
                  @click="showDetail(self)"
                  v-if="chatItem.msg.from == constant.MSG_FROM_SELF"
                  :src="self.avatar"
                  alt=""
                />
              </el-popover>
              <context-menu
                ref="chatContextMenu"
                :context-menu-show.sync="contextShow"
                :config="contextConfig"
                @removeChat="removeChat"
              >
              </context-menu>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div class="toolbar">
          <div>
            <el-popover
              placement="top"
              trigger="manual"
              width="475"
              v-model="expressionVisible"
            >
              <span
                @click="expressionVisible = !expressionVisible"
                slot="reference"
              >
                <img
                  style="margin-top: 5px"
                  class="tool-icon"
                  :src="require('@/assets/chatTool/expression.png')"
              /></span>

              <div class="weui-tab">
                <div class="weui-tab__panel">
                  <el-scrollbar style="height: 325px">
                    <img
                      class="expression-img"
                      @click="selExpression(expression)"
                      v-for="expression in expressions"
                      :key="expression.index"
                      :src="expression.img"
                      alt=""
                  /></el-scrollbar>
                </div>
                <div class="weui-navbar">
                  <div class="weui-navbar__item">
                    <img :src="exp1" class="exp-menu" />
                  </div>
                  <div class="weui-navbar__item weui-bar__item_on">
                    <img :src="exp2" class="exp-menu" />
                  </div>
                  <div class="weui-navbar__item weui-bar__item_on">
                    <img :src="exp3" class="exp-menu" />
                  </div>
                  <div class="weui-navbar__item weui-bar__item_on">
                    <img :src="exp4" class="exp-menu" />
                  </div>
                </div>
              </div>
            </el-popover>
            <span>
              <img
                class="tool-icon"
                @click="dashBoard"
                :src="require('@/assets/chatTool/file.png')"
            /></span>
            <span>
              <img
                class="tool-icon"
                :src="require('@/assets/chatTool/cut.png')"
            /></span>
            <span>
              <img
                @click="chatManage"
                class="tool-icon"
                :src="require('@/assets/chatTool/msg.png')"
            /></span>
          </div>
          <div>
            <span>
              <img
                class="tool-icon"
                :src="require('@/assets/chatTool/rec.png')"
            /></span>
            <span>
              <img
                class="tool-icon"
                :src="require('@/assets/chatTool/phonecam.png')"
            /></span>
          </div>
        </div>
        <div>
          <textarea
            rows="3"
            v-model.trim="message"
            @keydown="messageSendlisten"
          ></textarea>
        </div>
        <div class="sent_warp">
          <button @click="submit()">发送(S)</button>
        </div>
      </footer>
      <setting :event="dashboard_event"></setting>
      <transfer
        :event="transfer_event"
        @commit="commitTransferWindow"
      ></transfer>
      <call :event="call_event"></call>

      <chat-history :event="chat_manage_event"></chat-history
    ></el-main>
    <el-aside width="250" v-if="showMenu">
      <div class="menu-frame" ref="menu" :tabindex="1" @blur="onBlur">
        <el-row>
          <el-col :span="24">
            <div class="weui-grids">
              <div
                class="weui-grid"
                v-for="item of avatars"
                :key="item.title"
                @click="onSelectedAvatar(item.url)"
              >
                <div class="block">
                  <el-row>
                    <el-col :span="24">
                      <el-avatar
                        :src="item.url"
                        shape="square"
                        :size="35"
                      ></el-avatar
                    ></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <span class="title">{{ item.title }}</span></el-col
                    >
                  </el-row>
                </div>
              </div>
            </div></el-col
          >
        </el-row>
        <el-row>
          <div class="weui-loadmore_line"></div>
        </el-row>
        <el-row class="option-frame">
          <el-col :span="12">
            <span class="option-text">消息免打扰</span>
          </el-col>
          <el-col :span="12">
            <el-switch
              class="switch"
              v-model="value1"
              active-color="green"
              inactive-color="#CBCBCB"
            >
            </el-switch>
          </el-col>
        </el-row>
        <el-row class="option-frame">
          <el-col :span="12">
            <span class="option-text">顶置聊天</span>
          </el-col>
          <el-col :span="12">
            <el-switch
              class="switch"
              v-model="value2"
              active-color="green"
              inactive-color="#CBCBCB"
            >
            </el-switch>
          </el-col>
        </el-row>
      </div>
    </el-aside>
  </el-container>
</template>

<script lang='ts'>
import EventEmitter from "eventemitter3";
const ipcRenderer = require("electron").ipcRenderer;
import { Message } from "element-ui";
import dayjs from "dayjs";
import { mapGetters, mapMutations } from "vuex";
import ContactDetail from "@/components/dialogs/contact_detail.vue";

import constant from "@/constant";
import ChatHeader from "@/components/chat/chat_header.vue";
import MessageText from "@/components/messages/message_text.vue";
import MessageImgR from "@/components/messages/message_img_r.vue";
import MessageImgL from "@/components/messages/message_img_l.vue";
import MessageTransfer from "@/components/messages/message_transfer.vue";
import MessageVoice from "@/components/messages/message_voice.vue";
import MessageVideoR from "@/components/messages/message_video_r.vue";
import MessageVideoL from "@/components/messages/message_video_l.vue";
import MessageFile from "@/components/messages/message_file.vue";
import MessageCallVoice from "@/components/messages/message_call_voice.vue";
import MessageCallVideo from "@/components/messages/message_call_video.vue";
import ChatHistory from "@/components/chatHistory/index.vue";
import Setting from "@/components/setting/index.vue";
import Transfer from "@/components/transfer/index.vue";
import contextMenu from "@/components/contextMenu/index.vue";
import Call from "@/components/dialogs/call.vue";
import Vue from "vue";

const GroupMsgHandler: Function = (value) => {
  let joinIcon = require("@/assets/join.png");
  var avatars = [];
  avatars.push({ url: joinIcon, title: "添加" });

  var nowChat = [];

  value.chats.forEach((item) => {
    var currentModel = [];
    item.msgs.forEach((msg) => {
      let currentMsgModel = {
        user: item.user,
        desc: item.desc,
        region: item.region,
        wechatId: item.wechatId,
        sex: item.sex,
        avatar: item.avatar,
        msg: msg,
      };
      currentModel.push(currentMsgModel);
    });
    if (currentModel.length > 0) {
      nowChat = nowChat.concat(currentModel);
    }

    avatars.push({ url: item.avatar, title: item.user });
  });
  nowChat.sort(function (a, b) {
    let date1 = dayjs(a.msg.time);
    let date2 = dayjs(b.msg.time);
    return date1 > date2 ? 1 : -1;
  });
  return { avatars, nowChat };
};

export default Vue.extend({
  components: {
    ChatHistory,
    Setting,
    ChatHeader,
    MessageText,
    MessageImgR,
    MessageImgL,
    MessageTransfer,
    MessageVoice,
    MessageVideoR,
    MessageVideoL,
    MessageFile,
    MessageCallVoice,
    MessageCallVideo,
    ContactDetail,
    contextMenu,
    Call,
    Transfer,
  },

  props: ["nowChats"],
  computed: {
    ...mapGetters(["self", "nowUser", "preset"]),
  },
  watch: {
    nowUser: function (value) {
      console.log("now user changed" + value);
    },
    preset: function (value) {
      console.log("preset changed" + value);
    },
    nowChats: function (value) {
      if (value.type == "chat") {
        return;
      }
      this.$nextTick(() => {
        var result = GroupMsgHandler(value);
        this.avatars = result.avatars;
        this.nowChat = result.nowChat;

        this.changePreset(value.user);
      });
    },
  },

  data() {
    return {
      showMenu: false,
      message: "",
      constant: constant,
      event_expression: null,
      chat_manage_event: null,
      call_event: null,
      dashboard_event: null,
      transfer_event: null,

      avatars: [],
      expressions: (this as any).$expressions,
      expressionVisible: false,
      value1: true,
      value2: true,
      nowChat: undefined,
      contextShow: false,

      exp1: require("@/assets/expressionMenu/p0.png"),
      exp2: require("@/assets/expressionMenu/p3.png"),
      exp3: require("@/assets/expressionMenu/p1.png"),
      exp4: require("@/assets/expressionMenu/p2.png"),
      contextConfig: {
        // 右键点击距左位置
        offsetLeft: 0,
        // 右键点击距上位置
        offsetTop: 0,
        width: 148,
        menuList: [
          // 无需按键监听可以不传keyCode
          { label: "复制", id: 1 },
          { label: "引用", id: 2 },
          { label: "转发", id: 3 },
          {
            label: "删除",
            id: 4,
            emitType: "removeChat",
          },
        ],
      },
    };
  },
  destroyed() {
    // 在组件生命周期结束的时候销毁。
    window.removeEventListener("keydown", this.receiveMessage, false);
    this.$globalEvent.removeAllListeners("pubmsg");
  },
  created() {
    this.event_expression = new EventEmitter();
    this.chat_manage_event = new EventEmitter();
    this.call_event = new EventEmitter();
    this.dashboard_event = new EventEmitter();
    this.transfer_event = new EventEmitter();

    this.changeUser(constant.MSG_FROM_SELF);
    window.addEventListener("keydown", this.receiveMessage);

    this.$globalEvent.on("pubmsg", this.onPubmsgListener);
  },
  methods: {
    ...mapMutations(["pushMessage", "changeNowUser", "changePreset"]),
    showDetail(msg) {},
    removeChat() {
      this.contextShow = false;
    },
    receiveMessage(e) {
      if (this.nowChats.type == "chat") {
        return;
      }
      //F9
      if (e.keyCode == 120) {
        this.changeUser(constant.MSG_FROM_SELF);
      }
      //F10
      else if (e.keyCode == 121) {
        this.changeUser(constant.MSG_FROM_OPPOSITE);
      } else {
        //F1
        var currentPreset = null;
        if (e.keyCode == 112) {
          currentPreset = this.preset.f1;
        }
        //F2
        else if (e.keyCode == 113) {
          currentPreset = this.preset.f2;
        }
        //F3
        else if (e.keyCode == 114) {
          currentPreset = this.preset.f3;
        }
        //F4
        else if (e.keyCode == 115) {
          currentPreset = this.preset.f4;
        }
        //F5
        else if (e.keyCode == 116) {
          currentPreset = this.preset.f5;
        }
        //F6
        else if (e.keyCode == 117) {
          currentPreset = this.preset.f6;
        }
        //F7
        else if (e.keyCode == 118) {
          currentPreset = this.preset.f7;
        }
        //F8
        else if (e.keyCode == 119) {
          currentPreset = this.preset.f8;
        }
        if (currentPreset != null) {
          this.pushMessage({
            chat_id: this.nowChats.id,
            type: currentPreset.type,
            from: currentPreset.from,
            data: currentPreset.data,
            time: dayjs().format(),
          });
        }
      }
    },

    onBlur() {
      this.onShowMore(false);
      (this.$refs.chatHeader as any).setShowMore(false);
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
    dashBoard() {
      this.dashboard_event.emit("open");
    },
    onShowMore(isShow) {
      this.showMenu = isShow;
      if (isShow) {
        this.$nextTick(() => {
          (this.$refs.menu as any).focus();
        });
      }
    },
    chatManage() {
      this.chat_manage_event.emit("open");
    },
    getClass(from) {
      return from == constant.MSG_FROM_SELF ? "self" : "opposite";
    },
    getNowChat() {
      if (this.nowChat == null) {
        var result = GroupMsgHandler(this.nowChats);
        this.avatars = result.avatars;
        this.nowChat = result.nowChat;
      }

      return this.nowChat;
    },
    messageSendlisten(event) {
      if (event.keyCode === 13) {
        this.submit(null); // 发送文本
        event.preventDefault(); // 阻止浏览器默认换行操作
        return false;
      }
    },
    submit(user = null) {
      if (this.isEmpty(this.message)) {
        return;
      }
      this.message = this.messageTransferHTML(this.message);
      this.pushMessage({
        chat_id: this.nowChats.id,
        type: constant.MSG_TYPE_TEXT,
        from: user == null ? this.nowUser : user,
        data: this.message,
        time: dayjs().format(),
      });
      this.message = "";
    },
    onPubmsgListener() {
      if (this.nowChats.type == "chat") {
        return;
      }
      var result = GroupMsgHandler(this.nowChats);
      this.avatars = result.avatars;
      this.nowChat = result.nowChat;
      this.$nextTick(() => {
        (this.$refs.chatWindow as any).scrollTop =
          (this.$refs.chatWindow as any).scrollHeight + 100;
      });
    },

    isEmpty(str: any): boolean {
      if (str === null || str === "" || str === undefined || str.length === 0) {
        return true;
      } else {
        return false;
      }
    },
    // 转账点击
    transferClick(msg) {
      if (msg.data.type != constant.TRANSFER_PUBLISH) {
        this.transfer.step = 2;
      } else {
        this.transfer.step = 1;
      }
      this.transfer.now = msg;
      this.transfer.show = true;
      console.log(this.transfer.now);
    },
    changeUser(user) {
      if (
        this.nowUser != constant.MSG_FROM_SELF &&
        user == constant.MSG_FROM_SELF
      ) {
        this.changeNowUser(user);
        Message.success(`已切换为自己`);
      }
    },
    openTransferWindow(msg) {
      this.transfer_event.emit("open", msg);
    },
    call() {
      this.call_event.emit("open");
    },
    commitTransferWindow(_msg) {
      _msg.chat_id = this.nowChat.id;
      _msg.id = this.nowChat.msgs.length;
      this.pushMessage(_msg);
    },

    selExpression(expression) {
      this.message = this.message + `[i-${expression.index}]`;
      this.expressionVisible = false;
    },
    messageTransferHTML(str) {
      let strs = str.split("[i-");
      let result = [];
      for (let i = 0; i < strs.length; i++) {
        let cons = strs[i].split("]");
        if (cons.length == 2) {
          result.push({
            content: cons[0],
            expression: true,
          });
          result.push({
            content: cons[1],
            expression: false,
          });
        } else {
          cons.forEach((it) => {
            result.push({
              content: it,
              expression: false,
            });
          });
        }
      }
      let rep = "";
      result.forEach((it) => {
        console.log(it);
        if (it.expression) {
          let img = this.$expressions.find((itt) => {
            return itt.index == it.content;
          });
          console.log(img);
          rep =
            rep +
            `<img src="${img.img}" style="width:24px;height:24px;margin: 0 3px;"/>`;
        } else {
          rep = rep + it.content;
        }
      });
      console.log(rep);
      return rep;
    },
  },
});
</script>

<style scoped lang="scss">
.expression-img {
  cursor: pointer;
  width: 26px;
  height: 26px;
}

.weui-navbar {
  height: 40px;
  .weui-navbar__item {
    padding: 5px 0;
    .exp-menu {
      width: 30px;
      height: 30px;
    }
  }
}
#chat {
  width: 100%;
  height: 100%;
  .tool-icon {
    height: 20px;
    width: 20px;
  }
  .frame {
    position: relative;
    padding: 0;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    .header {
      height: 60px;
    }

    .body {
      flex: 1;
      overflow-y: hidden;
      overflow-x: hidden;
      .window {
        height: 100%;
        width: calc(100% + #{17px});
        overflow-y: scroll;
        padding: 0px;
        margin: 0px;
        > .message:last-of-type {
          margin-bottom: 8px;
        }
      }
      .opposite,
      .self {
        display: flex;
        padding: 0 28px;
        margin-top: 15px;
        img {
          width: 35px;
          height: 35px;
          cursor: pointer;
        }
      }
      .opposite {
        justify-content: flex-start;
        img {
          margin-right: 8px;
        }
      }
      .self {
        justify-content: flex-end;
        img {
          margin-left: 8px;
        }
      }
      .sys_msg {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 15px;
        > span {
          cursor: pointer;
          font-size: 12px;
          color: #fff;
          background-color: #dadada;
          border-radius: 2px;
          padding: 3px 8px;
        }
      }
    }

    footer {
      height: 145px;
      background-color: white;
      border-top: 1px solid #e5e5e5;
      padding: 6px 15px;
      .toolbar {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        div {
          display: flex;
          align-items: center;
          > span {
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 34px;
            height: 30px;
            > span {
              font-size: 18px;
            }
            .icon-cut {
              font-size: 16px;
              font-weight: bold;
            }
            &:hover {
              background-color: #efefef;
            }
          }
        }
        div:last-child {
          .icon-call_1 {
            font-weight: 100;
            font-size: 20px;
          }
          .icon-video_1 {
            font-weight: 500;
            font-size: 22px;
          }
        }
      }
      textarea {
        width: 100%;
        height: 100%;
        resize: none;
        border: none;
        outline: none;
        font-size: 14px;
        font-weight: 500px;
        padding: 8px;
      }
      .sent_warp {
        display: flex;
        justify-content: flex-end;
        button {
          width: 68px;
          height: 26px;
          border: 1px solid #e5e5e5;
          background-color: #f5f5f5;
          font-size: 14px;
          outline: none;
          cursor: pointer;
        }
        button:hover {
          background-color: #129611;
          color: #fff;
        }
      }
    }
  }

  .menu-frame {
    outline: 0px;
    background-color: #f5f5f5;
    padding: 20px;
    width: 250px;
    height: 100%;
    .weui-grid {
      width: 25%;
      padding: 10px 0px;
    }
    .title {
      width: 100%;
      margin-bottom: 10px;
      font-size: 12px;
      color: #8492a6;
    }
    .block {
      text-align: center;
      font-size: 14px;
    }

    .option-text {
      font-size: 14px;
    }

    .switch {
      float: right;
      margin-right: 10px;
    }

    .option-frame {
      margin-top: 20px;
    }
  }
}
</style>