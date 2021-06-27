<template>
  <div id="list">
    <el-scrollbar class="list-container" style="margin-top: 20px">
      <span>
        <el-row>
          <el-col :span="24" v-for="(file, index) in files" :key="index">
            <span v-if="index == 2" class="list-title">筛选</span>
            <span>
              <div
                @click="changeFile(file)"
                @contextmenu.prevent="onContextMenu"
                :class="{
                  active: false,
                  item: true,
                }"
              >
                <i :class="file.img"></i>
                <div class="meta">
                  <div class="top">
                    <span class="name">{{ file.name }}</span>
                  </div>
                </div>
              </div></span
            ></el-col
          >
        </el-row></span
      >
    </el-scrollbar>
  </div>
</template>


<script lang='ts'>
import EventEmitter from "eventemitter3";
import dayjs from "dayjs";
import contextMenu from "@/components/contextMenu/index.vue";
import { mapGetters, mapMutations } from "vuex";
import Vue from "vue";

export default Vue.extend({
  components: {
    contextMenu,
  },
  computed: {},
  data() {
    return {
      visible: false,
      contextShow: false,

      files: [
        {
          img: "el-icon-menu",
          name: "全部",
        },
        {
          img: "el-icon-link",
          name: "最近使用",
        },
        {
          img: "el-icon-picture-outline",
          name: "发送者",
        },
        {
          img: "el-icon-notebook-2",
          name: "聊天",
        },
        {
          img: "el-icon-tickets",
          name: "类型",
        },
      ],
    };
  },

  methods: {
    changeFile(msg) {
      this.$emit("changeFile", msg);
    },

    onContextMenu({ clientX, clientY }) {
      Object.assign(this, {
        contextConfig: {
          offsetLeft: clientX,
          offsetTop: clientY,
        },
        contextShow: true,
      });
    },

    rowDialogClose() {
      this.visible = false;
    },

    onOpen() {
      this.visible = true;
    },
  },
});
</script>


<style scoped lang="scss">
#list {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
}
.list-container {
  width: 120px;
  height: 100%;
  padding: 0px;
  margin: 0px;

  .list-title {
    font-size: 12px;
    margin: 15px;
    color: gray;
  }

  .item {
    padding: 15px;
    display: flex;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
      border-radius: 2px;
      margin-right: 13px;
    }
    .meta {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .top {
        margin-left: 15px;
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
      .last_msg {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top: 4px;
        font-size: 12px;
        width: 160px;
        color: #6c6a6a;
      }
    }
  }
  .item:hover:not(.active) {
    background-color: #dfdcdb;
  }
  .active {
    background-color: #c6c5c5;
  }
}
</style>