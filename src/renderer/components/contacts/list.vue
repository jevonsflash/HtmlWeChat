<template>
  <div id="list">
    <header>
      <div class="search">
        <span class="icon-sreach"></span>
        <span>搜索</span>
      </div>
      <div class="add">
        <i class="el-icon-plus" @click="addContact"></i>
      </div>
    </header>
    <el-scrollbar
      class="list-container"
      style="margin-top: 15px; margin-bottom: 10px"
    >
      <el-row>
        <el-col :span="24">
          <span>
            <el-row>
              <el-col :span="24">
                <a
                  href="#form_checkbox"
                  class="weui-btn weui-btn_default"
                  style="
                    color: black;
                    font-weight: unset;
                    width: 240px;
                    background-color: white;
                  "
                  ><i class="el-icon-s-custom"></i>通讯录管理
                </a>
              </el-col></el-row
            ></span
          >

          <span class="list-title">{{ newFriendContract.name }}</span>

          <span>
            <div
              @click="changeContact(newFriendContract, 'newFriend')"
              @contextmenu.prevent="onContextMenu"
              :class="{
                active: nowContact && nowContact.name == newFriendContract.name,
                item: true,
              }"
            >
              <img :src="newFriendContract.avatar" />
              <div class="meta">
                <div class="top">
                  <span class="name">{{ newFriendContract.name }}</span>
                </div>
              </div>
            </div>
            <context-menu
              :context-menu-show.sync="contextShow"
              :config="contextConfig"
              @edit="edit"
              @remove="remove"
            >
            </context-menu>
          </span>
        </el-col>
        <el-col :span="24">
          <el-divider></el-divider>

          <span class="list-title">{{ gzhContract.name }}</span>

          <span>
            <div
              @click="changeContact(gzhContract, 'gzh')"
              @contextmenu.prevent="onContextMenu"
              :class="{
                active: nowContact && nowContact.name == gzhContract.name,
                item: true,
              }"
            >
              <img :src="gzhContract.avatar" />
              <div class="meta">
                <div class="top">
                  <span class="name">{{ gzhContract.name }}</span>
                </div>
              </div>
            </div>
            <context-menu
              :context-menu-show.sync="contextShow"
              :config="contextConfig"
              @edit="edit"
              @remove="remove"
            >
            </context-menu>
          </span>
        </el-col>
        <el-col :span="24" v-for="(contact, index) in contacts" :key="index">
          <el-divider v-if="index == 0"></el-divider>
          <span v-if="index == 0" class="list-title">朋友</span>
          <span>
            <div
              @click="changeContact(contact, 'contact')"
              @contextmenu.prevent="onContextMenu"
              :class="{
                active: nowContact && nowContact.name == contact.name,
                item: true,
              }"
            >
              <img :src="contact.avatar" />
              <div class="meta">
                <div class="top">
                  <span class="name">{{ contact.name }}</span>
                </div>
              </div>
            </div>
            <context-menu
              ref="contactContextMenu"
              :context-menu-show.sync="contextShow"
              :context="contact"
              :config="contextConfig"
              @edit="edit"
              @remove="remove"
            >
            </context-menu>
          </span>
        </el-col>
        <el-col :span="24" v-for="(group, index) in group" :key="group.id">
          <span v-if="index == 0" class="list-title">群聊</span>
          <el-divider v-if="index == 0"></el-divider>

          <span>
            <div
              @click="changeContact(group, 'group')"
              @contextmenu.prevent="onContextMenu"
              :class="{
                active: nowContact && nowContact.name == group.name,
                item: true,
              }"
            >
              <div class="grid">
                <img
                  v-for="(member, index) in group.member"
                  :key="index"
                  class="block"
                  :src="member.avatar"
                />
              </div>

              <div class="meta">
                <div class="top">
                  <span class="name">{{ group.name }}</span>
                </div>
              </div>
            </div>
            <context-menu
              :context-menu-show.sync="contextShow"
              :context="group"
              :config="contextConfig"
              @edit="edit"
              @remove="remove"
            >
            </context-menu>
          </span>
        </el-col>
      </el-row>
    </el-scrollbar>
    <!-- <dialog-add-contact :event="add_contact_event"></dialog-add-contact> -->
    <dialog-add-group-contact
      :event="add_contact_event"
    ></dialog-add-group-contact>
    <dialog-change-info
      :event="edit_contact_event"
      :name="nowContact.name"
    ></dialog-change-info>
  </div>
</template>


<script lang='ts'>
import EventEmitter from "eventemitter3";
import dayjs from "dayjs";
import DialogAddContact from "@/components/dialogs/add_contact.vue";
import DialogAddGroupContact from "@/components/dialogs/add_group_contact.vue";
import contextMenu from "@/components/contextMenu/index.vue";
import { mapGetters, mapMutations } from "vuex";
import DialogChangeInfo from "@/components/dialogs/change_info.vue";

import Vue from "vue";
var Enumerable = require("linq");

export default Vue.extend({
  components: {
    DialogAddContact,
    contextMenu,
    DialogChangeInfo,
    DialogAddGroupContact,
  },
  computed: {
    ...mapGetters(["contacts"]),
    ...mapGetters(["group"]),
  },

  data() {
    return {
      newFriendContract: {
        name: "新的朋友",
        avatar: require("@/assets/newfriend.png"),
      },
      gzhContract: {
        name: "公众号",
        avatar: require("@/assets/gzh.png"),
      },
      add_contact_event: null,
      edit_contact_event: null,
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
        width: 128,
        menuList: [
          // 无需按键监听可以不传keyCode
          { label: "发消息", id: 1, emitType: "sendMsg" },
          { label: "发送名片", id: 2, emitType: "sendCard" },
          { label: "删除好友", id: 3, emitType: "remove" },
          { label: "编辑好友", id: 4, emitType: "edit" },
        ],
      },
      nowContact: undefined,
    };
  },
  created() {
    this.add_contact_event = new EventEmitter();
    this.edit_contact_event = new EventEmitter();
    this.changeContact(
      Enumerable.from(this.contacts).firstOrDefault(),
      "contact"
    );
  },
  methods: {
    edit() {
      this.contextShow = false;
      this.edit_contact_event.emit("open");
    },
    remove() {},

    changeContact(msg, type) {
      this.nowContact = msg;
      this.$emit("onChangeContact", msg, type);
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

    addContact() {
      this.add_contact_event.emit("open");
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
      .icon-sreach {
        margin: 0 8px;
      }
      span {
        font-size: 13px;
        color: #6c6a6a;
      }
    }
    .add {
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
    padding: 0px;
    margin: 0px;
    .list-title {
      font-size: 12px;
      margin: 15px;
      color: gray;
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
  }
}
</style>