<template>
  <div id="main">
     <el-row>
      <el-col :span="24">
        <div class="title-frame-left">
          <span class="title">视频号直播</span>
        </div>
      </el-col>
      
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="title-frame-left">
          <span class="title">意见反馈</span>
        </div>
      </el-col>
      
    </el-row>
  
    <el-row>
      <el-col :span="24">
        <div class="title-frame-left">
          <span class="title">备份与恢复</span>
        </div>
      </el-col>
      
    </el-row>
     <el-row>
      <el-col :span="24">
        <div class="title-frame-left" style="margin-bottom:20px">
          <span class="title">设置</span>
        </div>
      </el-col>
      
    </el-row>
  </div>
</template>

<script lang="ts" scoped>
import Vue from "vue";


export default Vue.extend({
 
});
</script>

<style lang="scss" scoped>
#main {
  background-color: #2e2e2e;
  
  .title{
    color:white;
    font-size: 14px;
  }
  .title-frame-left {
    margin-left: 20px;
    margin-top: 20px;

  }

}
</style>