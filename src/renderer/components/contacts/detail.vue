<template>
  <div id="detail">
    <contacts-header class="header" style="-webkit-app-region: drag">
    </contacts-header>
    <div class="weui-form-preview">
      <div class="weui-form-preview__hd">
        <el-row>
          <el-col :span="12">
            <el-row>
              <el-col :span="20"
                ><span class="page__title" style="text-align:left">{{ msg.name }}</span>
              </el-col>
              <el-col :span="24"
                ><img
                  :src="
                    msg.sex == '男'
                      ? '@/assets/male.png'
                      : '@/assets/female.png'
                  "
                />
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <span class="page__desc" style="text-align:left">{{ msg.desc }}</span>
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
  components:{
    ContactsHeader,

  },
  props: ["msg"],
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