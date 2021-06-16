<template>
  <div id="detail">
    <favourite-header class="header" :title="msg.name" style="-webkit-app-region: drag">
    </favourite-header>
  </div>
</template>
<script lang='ts'>
import FavouriteHeader from "@/components/favourite/favourite_header.vue";
import EventEmitter from "eventemitter3";
import { mapGetters, mapMutations } from "vuex";
import Vue from "vue";

export default Vue.extend({
  components: {
    FavouriteHeader,
  },
  props: ["msg"],
 

  data() {
    return {
      size: 60,
    };
  },
});
</script>
<style lang="scss" scoped>
#detail {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  .main-frame {
    width: 380px;
    margin: 0 auto;
    background-color: #f5f5f5;
  }

  .header {
    height: 60px;
  }
  .title {
    text-align: left;
    font-size: 20px;
    font-weight: 400;
  }
}
</style>