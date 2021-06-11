<template>
  <div id="detail">
    <contacts-header class="header" style="-webkit-app-region: drag">
    </contacts-header>
    <div class="weui-form-preview main-frame">
      <div class="weui-form-preview__hd">
        <el-row>
          <el-col :span="12">
            <el-row>
              <el-col :span="24">
                <el-container direction="horizontal">
                  <span class="page__title" style="text-align: left, font-size:40px">{{
                    msg.name
                  }}</span>

                  <el-avatar :size="20" :src="getAvatarUrl" /></el-container
              ></el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <span class="page__desc" style="text-align: left">{{
                  msg.desc
                }}</span>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-avatar
              class="avatar"
              shape="square"
              :size="size"
              :src="msg.avatar"
            ></el-avatar>
          </el-col>
        </el-row>
      </div>
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
      <div class="weui-form-preview__ft">
        <a class="weui-btn weui-btn_primary">发消息</a>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import ContactsHeader from "@/components/contacts/contacts_header.vue";
import EventEmitter from "eventemitter3";
import { mapGetters, mapMutations } from "vuex";
import Vue from "vue";

export default Vue.extend({
  components: {
    ContactsHeader,
  },
  props: ["msg"],
  computed: {
    getAvatarUrl() {
      let result= this.msg.sex == "男"
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
});
</script>
<style lang="scss">
#detail {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  .main-frame {
    width: 380px;
    margin: 0 auto;
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