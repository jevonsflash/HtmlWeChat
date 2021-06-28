<template>
  <div id="submain">
    <el-container class="main-container">
      <el-aside width="267px" style="overflow: hidden">
        <list></list>
      </el-aside>
      <el-main style="padding: 0">
        <group-chat
          :nowChats="nowChat"
          v-show="nowChat != null && isGroup(nowChat)"
        ></group-chat>
        <chat
          :nowChat="nowChat"
           v-show="nowChat != null && !isGroup(nowChat)"
        ></chat>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import List from "./list.vue";
import Chat from "./chat.vue";
import GroupChat from "./groupChat.vue";
import { mapGetters } from "vuex";
export default Vue.extend({
  computed: {
    ...mapGetters(["nowChat"]),
  },

  methods: {
    isGroup(obj) {
      var result = obj.type == "groupChat";
      return result;
    },
  },
  components: {
    List,
    Chat,
    GroupChat,
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