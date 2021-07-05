<template>
  <div id="submain">
    <el-container class="main-container">
      <el-main style="padding: 0;height:480px">
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  components: {

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