<template>
  <el-dialog
    :modal="false"
    title="转账"
    :visible="visible"
    width="300px"
    @close="rowDialogClose"
  >
    <div id="main-frame">
      <div
        v-if="step == 1 && !msg.data.receive_time"
        class="wait"
        style="-webkit-app-region: drag"
      >
        <img :src="require('@/assets/wait.png')" />
        <div class="title">待确认收钱</div>
        <div class="num">￥{{ msg.data.num }}</div>

        <a
          class="weui-btn weui-btn_primary"
          @click="affirmTransfer"
          v-show="step == 1 && !msg.data.receive_time"
          >确认收钱</a
        >
        <div class="des">1天内未确认，将退还给对方 <span>立即退还</span></div>
        <div class="time">转账时间：{{ msg.data.publish_time }}</div>
      </div>
      <div v-else class="ok" style="-webkit-app-region: drag">
        <img :src="require('@/assets/ok.png')" />
        <div class="title">已收钱</div>
        <div class="num">￥{{ msg.data.num }}</div>
        <div class="z_time">转账时间：{{ msg.data.publish_time }}</div>
        <div class="s_time">收钱时间：{{ msg.data.receive_time }}</div>
      </div>
    </div></el-dialog
  >
</template>


<script lang='ts'>
import constant from "@/constant";
import dayjs from "dayjs";
const ipcRenderer = require("electron").ipcRenderer;
import Vue from "vue";
export default Vue.extend({
  props: ["event"],
  data() {
    return {
      visible: false,
      msg: undefined,
      step: 1,
    };
  },
  created() {
    this.event.on("open", this.open);
  },
  methods: {
    rowDialogClose() {
      this.visible = false;
    },
    open(msg) {
      this.visible = true;
      this.msg = msg;
      if (this.msg.data.type == constant.TRANSFER_RECEIVE) {
        this.step = 2;
      } else {
        this.step = 1;
      }
    },
    // 确认收钱
    affirmTransfer() {
      this.step = 2;
      let receive_time = dayjs().format();
      this.msg.data.receive_time = receive_time;
      let from =
        this.msg.from == constant.MSG_FROM_SELF
          ? constant.MSG_FROM_OPPOSITE
          : constant.MSG_FROM_SELF;
      let msg = {
        type: constant.MSG_TYPE_TRANSFER,
        from,
        data: {
          num: this.msg.data.num,
          type: constant.TRANSFER_RECEIVE,
          publish_time: this.msg.data.publish_time,
          receive_time: receive_time,
        },
        time: dayjs().format(),
      };
      // 传递回去
      this.$emit("commit", msg);
    },
  },
});
</script>

<style scoped lang="scss">
#main-frame {
  width: 100%;

  .wait,
  .ok {
    height: 430px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    border-radius: 4px;
    img {
      height: 78px;
      margin-top: 65px;
    }
    .title {
      font-size: 22px;
      margin-top: 16px;
      font-weight: 500;
    }
    .num {
      font-size: 34px;
      margin-top: 20px;
      font-weight: 500;
    }
  }

  .wait {
    .btn {
      cursor: pointer;
      height: 41px;
      width: 180px;
      background-color: #1aad19;
      margin-top: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
    .des {
      font-size: 14px;
      margin-top: 22px;
      color: #a5a5a5;
      span {
        color: #426794;
      }
    }
    .time {
      font-size: 14px;
      margin-top: 40px;
      color: #a5a5a5;
    }
  }

  .ok {
    .z_time {
      margin-top: 126px;
      font-size: 14px;
      color: #a5a5a5;
    }
    .s_time {
      margin-top: 8px;
      font-size: 14px;
      color: #a5a5a5;
    }
  }
}
</style>