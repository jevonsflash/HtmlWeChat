<template>
  <div id="submain">
    <el-container class="main-container">
      <el-aside width="267px">
        <list @onChangeContact="onChangeContact"></list>
      </el-aside>
      <el-main style="padding: 0">
        <detail v-if="type == 'contact'" :msg="currentMsg"></detail>
        <gzh-detail v-else-if="type == 'gzh'" :msg="currentMsg"></gzh-detail>
        <group-detail
          v-else-if="type == 'group'"
          :msg="currentMsg"
        ></group-detail>
        <new-friend v-else-if="type == 'newFriend'" :msg="currentMsg"></new-friend>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import List from "./list.vue";
import Detail from "./detail.vue";
import GzhDetail from "./gzhDetail.vue";
import GroupDetail from "./groupDetail.vue";
import NewFriend from "./newFriend.vue";

export default Vue.extend({
  components: {
    List,
    Detail,
    GroupDetail,
    GzhDetail,
    NewFriend,
  },

  data() {
    return {
      type: null,
      currentMsg: null,
    };
  },
  methods: {
    onChangeContact(msg, type) {
      this.currentMsg = msg;
      this.type = type;
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