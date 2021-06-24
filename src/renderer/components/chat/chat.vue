<template>
  <el-container id="chat">
    <el-main class="frame">
      <chat-header
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
            v-for="(msg, index) in getNowChat().msgs"
            :key="index"
          >
            <div class="sys_msg" v-if="msg.from == constant.MSG_FROM_SYSTEM">
              <span @click="delMsg(msg.id)">{{ msg.data }}</span>
            </div>
            <div v-else :class="getClass(msg.from)">
              <img
                @click="delMsg(msg.id)"
                v-if="msg.from == constant.MSG_FROM_OPPOSITE"
                :src="nowChat.avatar"
                alt=""
              />

              <!-- 文字消息 -->
              <message-text
                v-if="msg.type == constant.MSG_TYPE_TEXT"
                :direction="msg.from"
                :msg="msg.data"
              ></message-text>

              <!-- 图片消息 -->
              <message-img-l
                v-if="
                  msg.type == constant.MSG_TYPE_IMG &&
                  msg.from == constant.MSG_FROM_OPPOSITE
                "
                :src="msg.data"
              ></message-img-l>
              <message-img-r
                v-if="
                  msg.type == constant.MSG_TYPE_IMG &&
                  msg.from == constant.MSG_FROM_SELF
                "
                :src="msg.data"
              ></message-img-r>

              <!-- 视频消息 -->
              <message-video-l
                v-if="
                  msg.type == constant.MSG_TYPE_VIDEO &&
                  msg.from == constant.MSG_FROM_OPPOSITE
                "
                :data="msg.data"
              ></message-video-l>
              <message-video-r
                v-if="
                  msg.type == constant.MSG_TYPE_VIDEO &&
                  msg.from == constant.MSG_FROM_SELF
                "
                :data="msg.data"
              ></message-video-r>

              <!-- 转账消息 -->
              <message-transfer
                @click.native="openTransferWindow(msg)"
                v-if="msg.type == constant.MSG_TYPE_TRANSFER"
                :direction="msg.from"
                :data="msg.data"
              ></message-transfer>

              <!-- 语言消息 -->
              <message-voice
                v-if="msg.type == constant.MSG_TYPE_VOICE"
                :direction="msg.from"
                :data="msg.data"
              ></message-voice>

              <!-- 文件消息 -->
              <message-file
                v-if="msg.type == constant.MSG_TYPE_FILE"
                :direction="msg.from"
                :data="msg.data"
              ></message-file>

              <!-- 语音通话消息 -->
              <message-call-voice
                v-if="msg.type == constant.MSG_TYPE_VOICE_CALL"
                :direction="msg.from"
                :data="msg.data"
              ></message-call-voice>

              <!-- 视频通话消息 -->
              <message-call-video
                v-if="msg.type == constant.MSG_TYPE_VIDEO_CALL"
                :direction="msg.from"
                :data="msg.data"
              ></message-call-video>

              <img
                @click="delMsg(msg.id)"
                v-if="msg.from == constant.MSG_FROM_SELF"
                :src="self.avatar"
                alt=""
              />
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
                ><svg-icon name="emoji"></svg-icon
              ></span>

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

            <span><svg-icon name="file"></svg-icon></span>
            <span><svg-icon name="cut"></svg-icon></span>
            <span
              ><svg-icon name="message" @click="chatManage"></svg-icon
            ></span>
          </div>
          <div>
            <span><svg-icon name="call"></svg-icon></span>
            <span><svg-icon name="video"></svg-icon></span>
          </div>
        </div>
        <div>
          <textarea rows="3" v-model="message" @keyup.enter="submit"></textarea>
        </div>
        <div class="sent_warp">
          <button @click="submit">发送(S)</button>
        </div>
      </footer>

      <dialog-chat-manage :event="chat_manage_event"></dialog-chat-manage
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

import constant from "@/constant.ts";
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
import DialogChatManage from "@/components/dialogs/chat_manage.vue";

import Vue from "vue";

export default Vue.extend({
  components: {
    DialogChatManage,
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
  },
  computed: {
    ...mapGetters(["nowChat", "self", "nowUser"]),
  },
  data() {
    return {
      showMenu: false,
      message: "",
      constant: constant,
      event_expression: null,
      chat_manage_event: null,
      avatars: [],
      expressions: (this as any).$expressions,
      expressionVisible: false,
      value1: true,
      value2: true,

      exp1: require("@/assets/expressionMenu/p0.png"),
      exp2: require("@/assets/expressionMenu/p3.png"),
      exp3: require("@/assets/expressionMenu/p1.png"),
      exp4: require("@/assets/expressionMenu/p2.png"),
    };
  },

  created() {
    this.event_expression = new EventEmitter();
    this.chat_manage_event = new EventEmitter();
    let joinIcon = require("@/assets/join.png");
    this.avatars.push({ url: joinIcon, title: "添加" });
    this.avatars.push({ url: this.nowChat.avatar, title: this.nowChat.user });

    window.addEventListener("keydown", (e) => {
      if ( e.keyCode == 120) {
        this.changeUser(constant.MSG_FROM_SELF);
      } else if ( e.keyCode == 121) {
        this.changeUser(constant.MSG_FROM_OPPOSITE);
      }
    });

    this.$globalEvent.on("pubmsg", this.onPubmsgListener);
  },
  methods: {
    ...mapMutations(["pushMessage", "changeNowUser", "delMsg"]),

    onBlur() {
      this.onShowMore(false);
      (this.$refs.chatHeader as any).setShowMore(false);
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
      return this.nowChat;
    },
    submit() {
      if (!this.message) return;
      this.message = this.messageTransferHTML(this.message);
      this.pushMessage({
        chat_id: this.nowChat.id,
        id: this.nowChat.msgs.length,
        type: constant.MSG_TYPE_TEXT,
        from: this.nowUser,
        data: this.message,
        time: dayjs().format("HH:mm"),
      });
      this.message = "";
    },
    onPubmsgListener() {
      this.$nextTick(() => {
        (this.$refs.chatWindow as any).scrollTop =
          (this.$refs.chatWindow as any).scrollHeight + 100;
      });
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
      this.changeNowUser(user);
      if (user == constant.MSG_FROM_SELF) {
        Message.success(`已切换为自己`);
      } else {
        Message.success(`已切换为对方`);
      }
    },
    openTransferWindow(msg) {
      ipcRenderer.removeAllListeners("transfer_on_msg");
      ipcRenderer.once("transfer_on_msg", (event, _msg) => {
        _msg = JSON.parse(_msg);
        _msg.chat_id = this.nowChat.id;
        _msg.id = this.nowChat.msgs.length;
        this.pushMessage(_msg);
        msg.data.receive_time = _msg.data.receive_time;
      });
      console.log("发送转账消息", msg);
      ipcRenderer.send("open_transfer_window", JSON.stringify(msg));
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