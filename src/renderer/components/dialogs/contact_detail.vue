<template>
  <div class="main-frame">
    <span>
      <el-row class="header-frame">
        <el-col :span="16">
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
                msg.wechatId
              }}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-avatar
            class="avatar"
            shape="square"
            :size="size"
            :src="msg.avatar"
          ></el-avatar>
        </el-col>
      </el-row>
    </span>
    <el-divider style="padding: 5px 16px"></el-divider>
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
          <label class="weui-form-preview__label">来源</label>
          <span class="weui-form-preview__value">通过群聊添加</span>
        </div>
      </div>
      <el-container direction="horizontal " class="avatar">
        <a>
          <img :src="shareIcon" />
        </a>
        <a >
          <img :src="chatIcon" />
        </a>
      </el-container>
    </span>
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
      let result =
        this.msg.sex == "男"
          ? require("@/assets/male.png")
          : require("@/assets/female.png");

      return result;
    },
  },

  data() {
    return {
      shareIcon: require("@/assets/share.png"),
      chatIcon: require("@/assets/chat.png"),
      size: 60,
    };
  },
});
</script>
<style lang="scss" scoped>
.main-frame {
  padding: 15px 0;
  .header-frame {
    padding: 0 16px;
  }

  .avatar {
    float: right;
  }
  .header-title {
    text-align: left;
    font-size: 20px;
  }
  .header-desc {
    text-align: left;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.5);
  }
}
</style>