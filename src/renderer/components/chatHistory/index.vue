<template>
  <div id="dialog_add_chat">
    <el-dialog
      :modal="false"
      top="40px"
      :title="nowChat.user"
      :visible="visible"
      @close="rowDialogClose"
      class="zero-padding"
    >
      <div id="submain">
        <el-container>
          <el-header style="height: 25px">
            <div class="search">
              <span class="icon-sreach"></span>
              <span>搜索</span>
            </div></el-header
          >

          <el-main>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="全部" name="first">
                <el-scrollbar class="list-container">
                  <div v-if="nowChat.type == 'chat'">
                    <el-row>
                      <el-col
                        :span="24"
                        v-for="(msg, index) in getNowChat().msgs"
                        :key="index"
                      >
                        <span>
                          <div class="item">
                            <div>
                              <img
                                :src="nowChat.avatar"
                                v-if="msg.from != constant.MSG_FROM_SELF"
                              />
                              <img
                                :src="self.avatar"
                                v-else-if="msg.from == constant.MSG_FROM_SELF"
                              />
                            </div>

                            <div class="meta">
                              <div class="top">
                                <span class="name">{{ nowChat.user }}</span>
                                <span class="time">{{
                                  msg.time | moment("HH:mm")
                                }}</span>
                              </div>
                              <div
                                class="last_msg"
                                v-if="msg.type == constant.MSG_TYPE_TEXT"
                              >
                                {{ msg.data }}
                              </div>

                              <div
                                class="last_msg"
                                v-else-if="msg.type == constant.MSG_TYPE_IMG"
                              >
                                <message-img-l :src="msg.data"></message-img-l>
                              </div>
                              <div
                                class="last_msg"
                                v-else-if="msg.type == constant.MSG_TYPE_VIDEO"
                              >
                                <message-video-l
                                  :data="msg.data"
                                ></message-video-l>
                              </div>
                              <div
                                class="last_msg"
                                v-else-if="
                                  msg.type == constant.MSG_TYPE_TRANSFER
                                "
                              >
                                <message-transfer
                                  @click.native="openTransferWindow(msg)"
                                  :direction="constant.MSG_FROM_OPPOSITE"
                                  :data="msg.data"
                                ></message-transfer>
                              </div>
                              <div
                                class="last_msg"
                                v-else-if="msg.type == constant.MSG_TYPE_FILE"
                              >
                                <message-file
                                  :direction="constant.MSG_FROM_OPPOSITE"
                                  :data="msg.data"
                                ></message-file>
                              </div>
                            </div></div
                        ></span>
                        <el-divider class="divider"></el-divider>
                      </el-col>
                    </el-row>
                  </div>
                  <div v-else-if="nowChat.type == 'groupChat'">
                    <el-row>
                      <el-col
                        :span="24"
                        v-for="(chatItem, index) in getNowChat()"
                        :key="index"
                      >
                        <span>
                          <div class="item">
                            <div>
                              <img
                                :src="chatItem.avatar"
                                v-if="
                                  chatItem.msg.from != constant.MSG_FROM_SELF
                                "
                              />
                              <img
                                :src="self.avatar"
                                v-else-if="
                                  chatItem.msg.from == constant.MSG_FROM_SELF
                                "
                              />
                            </div>

                            <div class="meta">
                              <div class="top">
                                <span class="name">{{ chatItem.user }}</span>
                                <span class="time">{{
                                  chatItem.msg.time | moment("HH:mm")
                                }}</span>
                              </div>
                              <div
                                class="last_msg"
                                v-if="
                                  chatItem.msg.type == constant.MSG_TYPE_TEXT
                                "
                              >
                                {{ chatItem.msg.data }}
                              </div>

                              <div
                                class="last_msg"
                                v-else-if="
                                  chatItem.msg.type == constant.MSG_TYPE_IMG
                                "
                              >
                                <message-img-l
                                  :src="chatItem.msg.data"
                                ></message-img-l>
                              </div>
                              <div
                                class="last_msg"
                                v-else-if="
                                  chatItem.msg.type == constant.MSG_TYPE_VIDEO
                                "
                              >
                                <message-video-l
                                  :data="chatItem.msg.data"
                                ></message-video-l>
                              </div>
                              <div
                                class="last_msg"
                                v-else-if="
                                  chatItem.msg.type ==
                                  constant.MSG_TYPE_TRANSFER
                                "
                              >
                                <message-transfer
                                  @click.native="openTransferWindow(msg)"
                                  :direction="constant.MSG_FROM_OPPOSITE"
                                  :data="chatItem.msg.data"
                                ></message-transfer>
                              </div>
                              <div
                                class="last_msg"
                                v-else-if="
                                  chatItem.msg.type == constant.MSG_TYPE_FILE
                                "
                              >
                                <message-file
                                  :direction="constant.MSG_FROM_OPPOSITE"
                                  :data="chatItem.msg.data"
                                ></message-file>
                              </div>
                            </div></div
                        ></span>
                        <el-divider class="divider"></el-divider>
                      </el-col>
                      <el-col
                        :span="24"
                        v-for="(msg, index) in getNowChat().msgs"
                        :key="index"
                      >
                        <span>
                          <div class="item">
                            <div>
                              <img
                                :src="nowChat.avatar"
                                v-if="
                                  chatItem.msg.from != constant.MSG_FROM_SELF
                                "
                              />
                              <img
                                :src="self.avatar"
                                v-if="
                                  chatItem.msg.from == constant.MSG_FROM_SELF
                                "
                              />
                            </div>

                            <div class="meta">
                              <div class="top">
                                <span class="name">{{ nowChat.user }}</span>
                                <span class="time">{{
                                  msg.time | moment("HH:mm")
                                }}</span>
                              </div>
                              <div
                                class="last_msg"
                                v-if="
                                  chatItem.msg.type == constant.MSG_TYPE_TEXT
                                "
                              >
                                {{ msg.data }}
                              </div>

                              <div
                                class="last_msg"
                                v-else-if="
                                  chatItem.msg.type == constant.MSG_TYPE_IMG
                                "
                              >
                                <message-img-l
                                  :src="chatItem.msg.data"
                                ></message-img-l>
                              </div>
                              <div
                                class="last_msg"
                                v-else-if="
                                  chatItem.msg.type == constant.MSG_TYPE_VIDEO
                                "
                              >
                                <message-video-l
                                  :data="chatItem.msg.data"
                                ></message-video-l>
                              </div>
                              <div
                                class="last_msg"
                                v-else-if="
                                  msg.type == constant.MSG_TYPE_TRANSFER
                                "
                              >
                                <message-transfer
                                  @click.native="openTransferWindow(msg)"
                                  :direction="constant.MSG_FROM_OPPOSITE"
                                  :data="chatItem.msg.data"
                                ></message-transfer>
                              </div>
                              <div
                                class="last_msg"
                                v-else-if="
                                  chatItem.msg.type == constant.MSG_TYPE_FILE
                                "
                              >
                                <message-file
                                  :direction="constant.MSG_FROM_OPPOSITE"
                                  :data="chatItem.msg.data"
                                ></message-file>
                              </div>
                            </div></div
                        ></span>
                        <el-divider class="divider"></el-divider>
                      </el-col>
                    </el-row>
                  </div> </el-scrollbar
              ></el-tab-pane>
              <el-tab-pane label="文件" name="second"></el-tab-pane>
              <el-tab-pane label="图片与视频" name="third"></el-tab-pane>
              <el-tab-pane label="链接" name="fourth"></el-tab-pane>
            </el-tabs>
          </el-main>
        </el-container>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import constant from "@/constant.ts";
import dayjs from "dayjs";

export default Vue.extend({
  components: {},
  props: ["event"],
  computed: {
    ...mapGetters(["self", "nowUser", "nowChat"]),
  },
  data() {
    return {
      visible: false,
      currentMsg: null,
      constant: constant,
      activeName: "first",
    };
  },
  methods: {
    onContextMenu({ clientX, clientY }) {
      Object.assign(this, {
        contextConfig: {
          offsetLeft: clientX,
          offsetTop: clientY,
        },
        contextShow: true,
      });
    },
    rowDialogClose() {
      this.visible = false;
    },
    open() {
      this.visible = true;
    },
    onChangeFile(msg) {
      this.currentMsg = msg;
    },
    getNowChat() {
      if (this.nowChat.type == "groupChat") {
        let joinIcon = require("@/assets/join.png");
        this.avatars = [];
        this.avatars.push({ url: joinIcon, title: "添加" });

        var nowGroupChat = [];

        this.nowChat.chats.forEach((item) => {
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
            nowGroupChat = nowGroupChat.concat(currentModel);
          }

          this.avatars.push({ url: item.avatar, title: item.user });
        });
        nowGroupChat.sort(function (a, b) {
          let date1 = dayjs(a.msg.time);
          let date2 = dayjs(b.msg.time);
          return date1 < date2 ? 1 : -1;
        });
        return nowGroupChat;
      } else {
        return this.nowChat;
      }
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
  created() {
    this.event.on("open", this.open);
  },
});
</script>
<style lang="scss">
.el-tabs__header {
  width: 314px !important;
  margin: 0 auto !important;
}
</style>
<style scoped lang="scss">
#submain {
  width: 100%;
  height: 600px;
  background-color: #f5f5f5;
   .list-container {
    height: 450px;
    padding: 0px;
    margin: 0px;}
  header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 25px;
    margin-bottom: 10px;
    .search {
      height: 25px;
      width: 400px;
      margin-right: 10px;
      background-color: #dbd9d8;
      display: flex;
      align-items: center;
      .icon-sreach {
        margin: 0 8px;
      }
      span {
        font-size: 13px;
        color: #6c6a6a;
      }
    }
  }
  .main-container {
    height: 100%;
    .divider {
      margin: 5px 10px 5px 65px;
      width: auto;
      background-color: #e6e8ec;
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
  }
}
</style>