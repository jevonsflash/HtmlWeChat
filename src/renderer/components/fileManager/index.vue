<template>
  <div id="submain">
    <el-container>
      <el-header style="height: 25px">
        <div class="search">
          <el-col :span="20"> <span style="margin-left:10px">搜索文件名/联系人/群聊名称</span></el-col>
          <el-col :span="20"> <i class="el-icon-search" /></el-col></div
      ></el-header>
      <el-container>
        <el-aside width="120px">
          <list @changeFile="onChangeFile"></list>
        </el-aside>
        <el-main> <detail :msg="currentMsg"></detail> </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import List from "./list.vue";
import Detail from "./detail.vue";
export default Vue.extend({
  components: {
    List,
    Detail,
  },

  data() {
    return {
      currentMsg: null,
    };
  },
  methods: {
    onChangeFile(msg) {
      this.currentMsg = msg;
    },
  },
});
</script>

<style scoped lang="scss">
#submain {
  width: 100%;
  height: 100%;
  header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 25px;
    margin-bottom: 10px;
    .search {
      height: 25px;
      width: 400px;
      margin-right: 10px;
      background-color: #dbd9d8;
      display: flex;
      align-items: center;
      border-radius: 5px;
      i {
        font-size: 12px;
        margin: 0 5px;
        float: right;
      }
      .icon-sreach {
        margin: 0 8px;
      }
      span {
        font-size: 13px;
        color: #6c6a6a;
      }
    }
  }
  .main-container {
    height: 100%;
  }
}
</style>