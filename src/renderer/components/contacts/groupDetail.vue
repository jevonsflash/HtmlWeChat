<template>
  <div id="detail" v-if="msg != null">
    <contacts-header
      class="header"
      :title="msg.name"
      style="-webkit-app-region: drag"
    >
    </contacts-header>
    <div class="main-frame">
      <div class="grid">
        <div v-for="(item, index) of msg.member" :key="index">
          <el-popover
            placement="bottom"
            title="标题"
            width="200"
            trigger="click"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
          >
            <div class="block" slot="reference">
              <el-avatar :size="50"  class="avatar"
               shape="square"
              :src="item.avatar"></el-avatar>
              <span class="title">{{ item.name }}</span>
            </div>
          </el-popover>
        </div>
      </div>
      <span>
        <a class="weui-btn weui-btn_primary">发消息</a>
      </span>
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
    
    margin: 15px 70px;
    background-color: #f5f5f5;
  }

  .header {
    height: 60px;
  }

  .grid {
    position: relative;
    display: grid;
    width:100%;
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
    .avatar{
      margin-top: 13px;
      margin: 0 auto;
    }
  }
}
</style>