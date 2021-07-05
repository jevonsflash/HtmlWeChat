<template>
  <div id="list">
    <header>
      <div class="search">
        <span class="icon-sreach"></span>
        <span>搜索</span>
      </div>
    </header>
    <el-scrollbar class="list-container" style="margin-top: 20px">
      <span>
        <el-row>
          <el-col :span="24">
            <a
              href="#form_checkbox"
              class="weui-btn weui-btn_default"
              style="color: black; font-weight: unset; background-color: white"
              ><i class="el-icon-edit"></i>新建笔记
            </a>
          </el-col></el-row
        ></span
      >
      <el-divider></el-divider>
      <span>
        <el-row>
          <el-col
            :span="24"
            v-for="(favourite, index) in favourites"
            :key="index"
          >
            <div
              @click="changeFavourite(favourite)"
              @contextmenu.prevent="onContextMenu"
              :class="{
                active: false,
                item: true,
              }"
            >
              <img :src="favourite.img" class="tool-icon" />

              <div class="meta">
                <div class="top">
                  <span class="name">{{ favourite.name }}</span>
                </div>
              </div>
            </div></el-col
          >
        </el-row></span
      >
      <el-divider></el-divider>

      <span>
        <el-row>
          <el-col :span="24">
            <div
              @contextmenu.prevent="onContextMenu"
              :class="{
                active: false,
                item: true,
              }"
            >
              <img
                :src="require('@/assets/fileManagerMenu/tag.png')"
                class="tool-icon"
              />

              <div class="meta">
                <div class="top">
                  <span class="name">标签</span>
                </div>
              </div>
            </div></el-col
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
  data() {
    return {
      visible: false,
      contextShow: false,

      favourites: [
        {
          img: require("@/assets/fileManagerMenu/all.png"),
          name: "全部收藏",
        },
        {
          img: require("@/assets/fileManagerMenu/link.png"),
          name: "链接",
        },
        {
          img: require("@/assets/fileManagerMenu/pic.png"),
          name: "相册",
        },
        {
          img: require("@/assets/fileManagerMenu/book.png"),
          name: "笔记",
        },
        {
          img: require("@/assets/fileManagerMenu/doc.png"),
          name: "文件",
        },
        {
          img: require("@/assets/fileManagerMenu/music.png"),
          name: "音乐",
        },
      ],
    };
  },

  created() {
    this.$nextTick(() => {
      this.changeFavourite("全部收藏");
    });
  },
  methods: {
    changeFavourite(msg) {
      this.$emit("changeFavourite", msg);
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
  background-color: #ebe8e7;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 25px;
    margin-bottom: 10px;
    .search {
      height: 25px;
      width: 190px;
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
    .add {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 25px;
      width: 25px;
      background-color: #dbd9d8;
    }
  }
  .list-container {
    width: 267px;
    height: 100%;
    padding: 0px;
    margin: 0px;
    .item {
      padding: 10px;
      display: flex;
      align-items: center;
      img {
        width: 20px;
        height: 20px;
        border-radius: 2px;
        margin-right: 8px;
        margin-left: 13px;
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
}
</style>