<template>
  <div id="dialog_add_chat">
    <el-dialog :visible="visible" @close="rowDialogClose" destroy-on-close>
      <draggable-list
        :list1="list1"
        :list2="list2"
        list1-title="List"
        list2-title="Article pool"
      />
      <div>
        <a
          href="javascript:"
          @click="submit"
          class="weui-btn weui-btn_mini weui-btn_primary"
          >确定</a
        >
        <a
          href="javascript:"
          @click="rowDialogClose"
          class="weui-btn weui-btn_mini weui-btn_default"
          >取消</a
        >
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import lrz from "lrz";
import dayjs from "dayjs";
import DraggableList from "./components/draggable_list.vue";

import { mapGetters, mapMutations } from "vuex";
import UserInfo from "@/model/userInfo";
import Enumerable from "linq";
import { GlobalEvent } from "@/constant";
export default Vue.extend({
  components: { DraggableList },
  props: ["event"],
  data() {
    return {
      list1: [],
      list2: [],
      visible: false,
      msg: null,
      rules: {
        name: [{ required: true, message: "请输入名字", trigger: "blur" }],
        avatar: [
          { required: true, message: "请输入头像地址", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["contacts", "group", "chats"]),
  },
  methods: {
    ...mapMutations(["pushGroup", "pushChat", "changeChat"]),
    rowDialogClose() {
      this.visible = false;
    },

    gotoGroupChat(msg) {
      let newChat = {
        id: this.chats.length,
        user: msg.name,
        avatar: Enumerable.from(msg.member as Array<UserInfo>)
          .select((c) => c.avatar)
          .toArray(),
        desc: "",
        region: "",
        wechatId: Enumerable.from(msg.member as Array<UserInfo>)
          .select((c) => c.name)
          .toArray(),
        sex: "",
        msgs: [],
      };
      this.pushChat(newChat);
      this.changeChat(newChat.id);

      GlobalEvent.emit("switch-pannel", "chat");
    },

    gotoChat(msg) {
      var currentChat = this.chats.find((it) => it.user == msg.name);
      if (currentChat == null) {
        let newChat = {
          id: this.chats.length,
          user: msg.name,
          avatar: msg.avatar,

          desc: msg.desc,
          region: msg.region,
          wechatId: msg.wechatId,
          sex: msg.sex,
          msgs: [],
        };
        this.pushChat(newChat);
        this.changeChat(newChat.id);
      } else {
        this.changeChat(currentChat.id);
      }

      GlobalEvent.emit("switch-pannel", "chat");
    },

    async submit() {
      if (this.list1.length > 1) {
        let newGroup = {
          id: "群聊" + this.group.length,
          name: "群聊" + this.group.length,

          notice: "这是群聊公告",
          myName: "",
          remarkName: "群聊备注",
          member: this.list1,
        };
        this.pushGroup(newGroup);
        this.gotoGroupChat(newGroup);
      } else {
        let newChat = this.list1[0];
        this.gotoChat(newChat);
      }

      this.rowDialogClose();
    },
    init() {
      var data = [];
      this.contacts.forEach((element) => {
        data.push(element);
      });
      this.list2 = data.splice(0, data.length);
      this.list1 = data;
      this.event.on("open", this.open);
    },

    open() {
      this.visible = true;
      this.init();
    },
    async upImg(req) {
      try {
        let file = req.file;
        let lrzfile = await lrz(file);
        this.msg.avatar = lrzfile.base64;
      } catch (err) {}
    },
  },
  created() {
    this.init();
  },
});
</script>

<style lang="scss" scoped>
.image {
  display: flex;
  align-items: center;
}
img {
  width: 100px;
  height: 100px;
}
</style>