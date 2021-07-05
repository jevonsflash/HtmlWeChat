<template>
  <div style="-webkit-app-region: no-drag">
    <el-row>
      <el-col :span="12">
        <div class="title">
          <span>微信</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="actions">
          <div class="toolbar">
            <div>
              <svg-icon name="gear"></svg-icon>
            </div>
            <div>
              <svg-icon name="close" @click="cross"></svg-icon>
            </div>
          </div></div
      ></el-col>
    </el-row>

    <div class="main-frame">
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-avatar
            class="avatar"
            shape="square"
            :size="size"
            :src="msg.avatar"
          ></el-avatar>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <span class="desc user-name">{{msg.name}}</span>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" style="height: 40px">
        <el-col :span="24">
          <a class="weui-btn weui-btn_primary" @click="login" v-if="!islogin"
            >登录</a
          >
          <span class="desc tip-confirm" v-else>请在手机上确认登陆</span>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-button type="text" class="desc tip" v-if="!islogin"
            >切换账号</el-button
          >
          <el-button type="text" class="desc tip" v-else
            >返回扫二维码登录</el-button
          >
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang='ts'>
import constant from "@/constant";
import dayjs from "dayjs";
import electron from "electron";
import UserInfo from "@/model/UserInfo";
import { mapGetters } from "vuex";
import Vue from "vue";
const ipcRenderer = require("electron").ipcRenderer;
export default Vue.extend({
  computed: {
    ...mapGetters(["self"]),
  },
  data() {
    return {
      step: 1,
      size: 90,
      islogin: false,
      msg: null,
    };
  },
  created() {
    this.msg = new UserInfo();
    this.msg.name = this.self.name;
    this.msg.avatar = this.self.avatar;
    this.msg.desc = this.self.desc;
    this.msg.remarkName = this.self.remarkName;
    this.msg.region = this.self.region;
    this.msg.wechatId = this.self.wechatId;
    this.msg.sex = this.self.sex;
  },

  methods: {
    minus() {
      ipcRenderer.send("window-min");
    },
    cross() {
      this.$store.commit("close");
    },
    login() {
      this.islogin = true;

      setTimeout(() => {
        ipcRenderer.send("open_main_window", JSON.stringify(this.msg));
        console.log("open_main_window send!");
        console.log((electron.app || electron.remote.app).getAppPath());
      }, 5 * 1000);
    },
  },
});
</script>

<style scoped lang="scss">
.title {
  margin: 10px;
  font-size: 14px;
  span {
    color: var(--weui-FG-2);
  }
}
.actions {
  -webkit-app-region: no-drag;
  float: right;
  .toolbar {
    display: flex;
    div {
      width: 34px;
      height: 26px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    div:hover {
      background-color: #dfdfdf;
    }
  }
}

.main-frame {
  padding-top: 60px;

  .avatar {
    margin-top: 10px;

    margin-left: auto;
    margin-right: auto;
    display: block;
  }

  .desc {
    margin-left: auto;
    margin-right: auto;
    display: block;
    text-align: center;
  }
  .user-name {
    margin-top: 35px;
    margin-bottom: 20px;
    font-size: 14px;
    color: var(--weui-FG-1);
  }

  .tip-confirm {
    font-size: 14px;
    color: var(--weui-FG-1);
  }

  .tip {
    margin-top: 30px;
    font-size: 14px;

    color: var(--weui-LINK);
  }
}
</style>