<template>
  <div id="dialog_chang_avatar" v-if="msg != undefined">
    <el-dialog title="修改好友资料" :visible="visible" @close="rowDialogClose">
      <el-form ref="form" :model="msg" style="width: 100%">
        <el-form-item class="el_avatar" label="我的头像" prop="avatar">
          <el-upload
            class="avatar-uploader"
            action="#"
            :limit="1"
            :show-file-list="false"
            :http-request="selfAvatarUP"
          >
            <img :src="msg.avatar" alt="" />
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="msg.name"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="msg.desc"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="msg.remarkName"></el-input>
        </el-form-item>
        <el-form-item label="地区">
          <el-input v-model="msg.region"></el-input>
        </el-form-item>
        <el-form-item label="微信号">
          <el-input v-model="msg.wechatId"></el-input>
        </el-form-item>
      </el-form>

      <el-button @click="submit" style="width: 100%">更 换</el-button>
    </el-dialog>
  </div>
</template>

<script>
import lrz from "lrz";
import dayjs from "dayjs";
import constant from "../../constant";
import { mapGetters, mapMutations } from "vuex";
export default {
  props: ["event", "name"],
  data() {
    return {
      visible: false,
      msg: undefined,
    };
  },
  watch: {
    name: function (value) {
      console.log(value);
    },
  },
  computed: {
    ...mapGetters(["contacts"]),
  },
  methods: {
    ...mapMutations(["updateContact"]),
    rowDialogClose() {
      this.visible = false;
    },
    async submit() {
      try {
        await this.$refs.form.validate();
        this.updateContact(this.msg);
      } catch (err) {}
    },
    open() {
      this.visible = true;
      let contact_index = this.contacts.findIndex((contact) => {
        return contact.name == this.name;
      });

      this.msg = this.contacts[contact_index];
      console.info(this.msg);
    },
    async selfAvatarUP(req) {
      try {
        let file = req.file;
        let lrzfile = await lrz(file);
        this.msg.avatar = lrzfile.base64;
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