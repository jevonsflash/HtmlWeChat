<template>
  <div id="detail" v-if="msg != null">
    <contacts-header
      class="header"
      :title="msg.name"
      style="-webkit-app-region: drag"
    >
    </contacts-header>
    <div class="main-frame">
      <el-container style="height: 100%">
        <el-main>
          <div class="grid">
            <div v-for="(item, index) of msg.member" :key="index">
              <el-popover placement="bottom" width="300" trigger="click"  :visible-arrow="false">
                <contact-detail :msg="item"></contact-detail>
                <div class="block" slot="reference">
                  <el-avatar
                    :size="50"
                    class="avatar"
                    shape="square"
                    :src="item.avatar"
                  ></el-avatar>
                  <span class="title">{{ item.name }}</span>
                </div>
              </el-popover>
            </div>
          </div></el-main
        >
        <el-footer><a class="weui-btn weui-btn_primary" @click="gotoChat">发消息</a></el-footer>
      </el-container>
    </div>
  </div>
</template>
<script lang='ts'>
import ContactsHeader from "@/components/contacts/contacts_header.vue";
import ContactDetail from "@/components/dialogs/contact_detail.vue";
import EventEmitter from "eventemitter3";
import { mapGetters, mapMutations } from "vuex";
import Vue from "vue";
import { GlobalEvent } from "@/constant";
import Enumerable from "linq";
import UserInfo from "@/renderer/model/userInfo";

export default Vue.extend({
  components: {
    ContactsHeader,
    ContactDetail,
  },
  props: ["msg"],
  computed: {
    ...mapGetters(["chats"]),
  },

  data() {
    return {
      size: 60,
    };
  },

  methods: {
    ...mapMutations(["pushChat", "changeChat"]),

    gotoChat() {
      var currentChat = this.chats.find((it) => it.user == this.msg.name);
      if (currentChat == null) {
        let newChat = {
          id: this.chats.length,
          user: this.msg.name,
          avatar:  Enumerable.from(this.msg.member as Array<UserInfo>).select(c=>c.avatar).toArray(),
          desc: "",
          region: "",
          wechatId: Enumerable.from(this.msg.member as Array<UserInfo>).select(c=>c.name).toArray(),
          sex: "",
          msgs: [],
        };
        this.pushChat(newChat);
        this.changeChat(newChat.id);
      } else {
        this.changeChat(currentChat.id);
      }

      GlobalEvent.emit("switch-pannel", "chat");
    },
  },
});
</script>
<style lang="scss" scoped>
#detail {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;

  .main-frame {
    padding: 15px 70px;
    background-color: #f5f5f5;
    height: 100%;
    overflow: hidden;
  }

  .header {
    height: 60px;
  }

  .grid {
    position: relative;
    display: grid;
    width: 100%;
    grid-template-columns: repeat(auto-fill, 80px);

    .title {
      margin-top: 13px;
      margin-bottom: 13px;
      font-size: 14px;
      color: #8492a6;
      text-align: center;
    }
    .block {
      flex: 1;
      display: flex;
      flex-direction: column;
      flex-grow: 0;
    }
    .avatar {
      margin-top: 13px;
      margin: 0 auto;
    }
  }
}
</style>