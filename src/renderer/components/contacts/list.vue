<template>
  <div id="list">
    <header>
      <div class="search">
        <span class="icon-sreach"></span>
        <span>搜索</span>
      </div>
      <div class="add">
        <svg-icon name="user" @click="addContact"></svg-icon>
      </div>
    </header>
    <overlay-scrollbars :options="osComponentOptions" class="list-container">
      <el-row>
        <el-col :span="24" v-for="(contact, index) in contacts" :key="index">
          <div
            @click="changeContact(contact)"
            @contextmenu.prevent="onContextMenu"
            :class="{
              active: nowContact && nowContact.id == contact.id,
              item: true,
            }"
          >
            <context-menu
              ref="contactContextMenu"
              :context-menu-show.sync="contextShow"
              :config="contextConfig"
            >
            </context-menu>

            <img :src="contact.avatar" />
            <div class="meta">
              <div class="top">
                <span class="name">{{ contact.name }}</span>
              </div>
            </div>
          </div></el-col
        >
      </el-row>
    </overlay-scrollbars>
    <dialog-add-contact :event="add_contact_event"></dialog-add-contact>
  </div>
</template>


<script lang='ts'>
import EventEmitter from "eventemitter3";
import dayjs from "dayjs";
import DialogAddContact from "@/components/dialogs/add_contact.vue";
import contextMenu from "@/components/contextMenu/index.vue";
import { mapGetters, mapMutations } from "vuex";
import Vue from "vue";

export default Vue.extend({
  components: {
    DialogAddContact,
    contextMenu,
  },
  computed: {
    ...mapGetters(["contacts"]),
  },
  data() {
    return {
      add_contact_event: null,
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
        ],
      },
    };
  },
  created() {
    this.add_contact_event = new EventEmitter();
  },
  methods: {
    changeContact(msg) {
      this.$emit("onChangeContact", msg);
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
  }
}
</style>