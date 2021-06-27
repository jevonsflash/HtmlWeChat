<template>
  <div id="submain">
    <el-container>
      <el-header style="height:25px">
        <div class="search">
          <span class="icon-sreach"></span>
          <span>搜索</span>
        </div></el-header
      >
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
.dialog-frame {
  padding: 0!important;
}
.el-dialog__body{
   padding: 0 !important;
}
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