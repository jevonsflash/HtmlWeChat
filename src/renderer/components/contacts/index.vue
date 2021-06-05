<template>
  <div id="submain">
    <el-container class="main-container">
      <el-aside width="280px">
        <list></list>
      </el-aside>
      <el-main style="padding: 0">
        <detail></detail>
      </el-main>
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
});
</script>

<style scoped lang="scss">
#submain {
  height: 100%;
  .main-container {
    height: 100%;
  }
}
</style>