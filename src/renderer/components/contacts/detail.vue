<template>
  <div id="detail" v-if="msg != null">
    <contacts-header class="header" style="-webkit-app-region: drag">
    </contacts-header>
    <div class="main-frame">
      <span>
        <el-row>
          <el-col :span="20">
            <el-row>
              <el-col :span="24">
                <el-container direction="horizontal">
                  <span class="header-title">{{ msg.name }}</span>

                  <el-avatar :size="20" :src="getAvatarUrl" /></el-container
              ></el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <span class="header-desc" style="text-align: left">{{
                  msg.desc
                }}</span>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="4">
            <el-avatar
              class="avatar"
              shape="square"
              :size="size"
              :src="msg.avatar"
            ></el-avatar>
          </el-col>
        </el-row>
      </span>
      <el-divider></el-divider>
      <span>
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">备注</label>
            <span class="weui-form-preview__value">{{ msg.remark }}</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">地区</label>
            <span class="weui-form-preview__value">{{ msg.region }}</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">微信号</label>
            <span class="weui-form-preview__value">{{ msg.wechatId }}</span>
          </div>
        </div>
      </span>
      <el-divider></el-divider>

      <span>
        <a class="weui-btn weui-btn_primary" @click="gotoChat">发消息</a>
      </span>
    </div>
  </div>
</template>
<script lang='ts'>
import ContactsHeader from "@/components/contacts/contacts_header.vue";
import EventEmitter from "eventemitter3";
import { mapGetters, mapMutations } from "vuex";
import { GlobalEvent } from "@/constant";

import Vue from "vue";

export default Vue.extend({
  components: {
    ContactsHeader,
  },
  props: ["msg"],
  computed: {
    getAvatarUrl() {
      let result =
        this.msg.sex == "男"
          ? require("@/assets/male.png")
          : require("@/assets/female.png");

      return result;
    },
  },

  data() {
    return {
      size: 60,
    };
  },
  methods: {
    ...mapMutations(["pushChat"]),

    gotoChat() {
      GlobalEvent.emit("switch-pannel","chat");
      this.pushChat({
        id: this.msg.id,
        user: this.msg.name,
        avatar: this.msg.avatar,

        desc: this.msg.desc,
        region: this.msg.region,
        wechatId: this.msg.wechatId,
        sex: this.msg.sex,
        msgs: [],
      });
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
  .header-title {
    text-align: left;
    font-size: 20px;
  }
  .header-desc {
    text-align: left;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.5);
  }
  .avatar {
    float: right;
  }
  .main-frame {
    width: 350px;
    margin: 30px auto 0 auto;
    background-color: #f5f5f5;
  }

  .header {
    height: 60px;
  }
  .title {
    text-align: left;
    font-size: 20px;
    font-weight: 400;
  }
}
</style>