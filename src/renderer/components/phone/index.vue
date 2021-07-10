<template>
  <div id="main">
    <el-row>
      <el-col :span="24">
        <div class="desc-frame">
          <span class="first-desc">手机正在浏览和浮窗的内容将会在这里显示</span>
        </div>
      </el-col> </el-row
    >
                        <el-divider class="divider"></el-divider>
    
    <el-row>
      <el-col :span="12">
        <el-avatar
          class="avatar"
          shape="circle"
          :size="45"
          :src="imgSrc"
        ></el-avatar>
      </el-col>
      <el-col :span="12">
        <div class="meta">
          <span class="sec-desc">文件传输助手</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
var Enumerable = require("linq");

export default Vue.extend({
  data() {
    return {
      imgSrc: undefined,
    };
  },

  created() {
    this.imgSrc = require("@/assets/img_ass2.png");
  },
});
</script>

<style lang="scss" scoped>
#main {
  background-color: #2e2e2e;
  padding-bottom: 10px;
  .title {
    color: white;
    font-size: 14px;
  }
 .divider {
      margin: 5px 15px;
      width: auto;
      background-color: #474747;
    }
  .avatar {
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    display: block;
  }
  .meta {
    margin-top: 20px;
  }

  .desc-frame {
    margin: 20px;
    .first-desc {
      margin-left: auto;
      margin-right: auto;
      display: block;
      text-align: center;
      color: white;
      font-size: 14px;
    }
  }
  .sec-desc {
    color: white;
  }
}
</style>