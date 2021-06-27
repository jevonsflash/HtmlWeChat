<template>
  <div id="submain">
    <el-container class="main-container">
      <el-aside width="267px">
        <list @changeFavourite="onChangeFavourite"></list>
      </el-aside>
      <el-main style="padding: 0">
        <detail :msg="currentMsg"></detail>
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

  data() {
    return {
      currentMsg: null,
    };
  },
  methods: {
    onChangeFavourite(msg) {
      this.currentMsg = msg;
    },
  },
});
</script>

<style scoped lang="scss">
#submain {
  width: 100%;
  height: 100%;
  .main-container {
    height: 100%;
  }
}
</style>