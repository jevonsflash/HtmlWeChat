<template>
  <div id="dialog_chang_avatar">
    <el-form ref="form" :model="msg" style="width: 100%">
      <el-form-item class="el_avatar" label="我的头像" prop="self_avatar">
        <!-- <el-input v-model="msg.self_avatar" placeholder="头像URL"></el-input> -->
        <el-upload
          class="avatar-uploader"
          action="#"
          :limit="1"
          :show-file-list="false"
          :http-request="selfAvatarUP"
        >
          <img :src="msg.self_avatar" alt="" />
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="msg.self_name"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="msg.self_desc"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="msg.self_remarkName"></el-input>
      </el-form-item>
      <el-form-item label="地区">
        <el-input v-model="msg.self_region"></el-input>
      </el-form-item>
      <el-form-item label="微信号">
        <el-input v-model="msg.self_wechatId"></el-input>
      </el-form-item>
      <el-form-item class="el_avatar" label="对方头像" prop="opposite_avatar">
        <!-- <el-input v-model="msg.opposite_avatar" placeholder="头像URL"></el-input> -->
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :http-request="oppositeAvatarUP"
        >
          <img :src="msg.opposite_avatar" alt="" />
        </el-upload>
      </el-form-item>
      <el-form-item label="对方名字" prop="opposite_name">
        <el-input v-model="msg.opposite_name" placeholder="名字"></el-input>
      </el-form-item>
    </el-form>

    <el-button @click="submit" style="width: 100%">更 换</el-button>
  </div>
</template>

<script>
import lrz from "lrz";
import dayjs from "dayjs";
import constant from "../../constant";
import { mapGetters, mapMutations } from "vuex";
export default {
  props: ["event"],
  data() {
    return {
      visible: false,
      msg: {
        self_avatar: "",
        opposite_name: "",
        opposite_avatar: "",
      },
    };
  },
  computed: {
    ...mapGetters(["self", "nowChat"]),
  },
  methods: {
    ...mapMutations(["changeAvatar", "changeNowChatInfo"]),
    rowDialogClose() {
      this.visible = false;
    },
    async submit() {
      try {
        await this.$refs.form.validate();
        this.changeAvatar({
          avatar: this.msg.self_avatar,
          name: this.msg.self_name,
          desc: this.msg.self_desc,
          remarkName: this.msg.self_remarkName,
          region: this.msg.self_region,
          wechatId: this.msg.self_wechatId,
        });
        this.changeNowChatInfo({
          user: this.msg.opposite_name,
          avatar: this.msg.opposite_avatar,
        });
      } catch (err) {}
    },
    open() {
      this.visible = true;
      this.msg.self_avatar = this.self.avatar;
      this.msg.opposite_name = this.nowChat.user;
      this.msg.opposite_avatar = this.nowChat.avatar;
    },
    async selfAvatarUP(req) {
      try {
        let file = req.file;
        let lrzfile = await lrz(file);
        this.msg.self_avatar = lrzfile.base64;
      } catch (err) {}
    },
    async oppositeAvatarUP(req) {
      try {
        let file = req.file;
        let lrzfile = await lrz(file);
        this.msg.opposite_avatar = lrzfile.base64;
      } catch (err) {}
    },
  },
  created() {
    this.event.on("open", this.open);
  },
  mounted() {},
};
</script>

<style scoped lang="scss">
#dialog_chang_avatar {
  .el_avatar {
    display: flex;
    align-items: center;
    img {
      width: 100px;
      height: 100px;
    }
  }
}
</style>