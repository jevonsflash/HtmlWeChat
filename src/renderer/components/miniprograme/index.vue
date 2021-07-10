<template>
  <div id="main">
    <el-row>
      <el-col :span="12">
        <div class="title-frame-left">
          <span class="title">小程序</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="title-frame-right">
          <i class="el-icon-search" style="float: right" />
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="title-frame-left">
          <span>最近使用</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="title-frame-right">
          <i class="el-icon-arrow-down" style="float: right" />
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="weui-grids">
          <div class="weui-grid" v-for="item of miniprograms" :key="item.title">
            <div class="block">
              <el-row>
                <el-col :span="24">
                  <el-avatar
                    class="miniprograme-img"
                    :src="item.url"
                    shape="circle"
                    :size="35"
                  ></el-avatar
                ></el-col>
              </el-row>
              <el-row>
                <el-col :span="24" class="miniprograme-title">
                  <span>{{ item.title }}</span></el-col
                >
              </el-row>
            </div>
          </div>
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="title-frame-left">
          <span>我的小程序</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="title-frame-right">
          <i class="el-icon-arrow-down" style="float: right" />
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-avatar
          class="avatar"
          shape="circle"
          :size="50"
          :src="require('@/assets/miniprograme.png')"
        ></el-avatar>
      </el-col>

      <el-col :span="24">
        <span class="next-desc">还没有我的小程序</span>
      </el-col>
      <el-col :span="24">
        <span class="next-desc">选中小程序右键可添加</span>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div class="item">
          <img :src="require('@/assets/find_miniprograme.png')" />
          <div class="meta">
            <div class="top">
              <span class="name">发现小程序</span>
              <span class="time">
                立即查看
                <i
                  class="el-icon-arrow-right"
                  style="float: right; font-size: 18px"
                />
              </span>
            </div>
            <div class="last_msg">游戏/办公/教育</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
var Enumerable = require("linq");

export default Vue.extend({
  created() {
    const req = require.context("@/assets/miniprograme", false, /\.png$/);
    const re = /\.\/(.*)\.png/;
    const matcher = (str: string) => {
      let match = str.match(re);
      if (match !== null) return match[1];
      return "";
    };
    const requireAll = (requireContext: any) => {
      let result = Enumerable.from(requireContext.keys())
        .select((c) => {
          return { url: req(c), title: matcher(c) };
        })
        .toArray();
      return result;
    };

    this.miniprograms = requireAll(req);
  },

  data() {
    return {
      miniprograms: {},
    };
  },
});
</script>

<style lang="scss" scoped>
#main {
  background-color: #2e2e2e;

  .title {
    color: white;
    font-size: 14px;
  }
  .title-frame-left {
    margin-left: 20px;
    margin-top: 20px;
  }
  .title-frame-right {
    margin-right: 40px;
    margin-top: 20px;
    color: rgb(201, 201, 201);

  }
  .avatar {
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    display: block;
  }

  .next-desc {
    margin-left: auto;
    margin-right: auto;
    display: block;
    text-align: center;

    font-size: 14px;
  }

  .weui-grid {
    width: 25%;
    padding: 10px 0px;
  }
  .miniprograme-img {
    display: block;
    margin: 0 auto;
  }

  .miniprograme-title {
    text-align: center;
    font-size: 12px;
    margin-top: 10px;
    color: white;
  }

  .item {
    margin: 15px 20px;
    padding: 13px;
    display: flex;
    background-color: #383838;
    align-items: center;
    img {
      width: 25;
      height: 25px;
      border-radius: 2px;
      margin-right: 13px;
    }
    .meta {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .top {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .name {
          font-size: 14px;
          color: white;
        }
        .time {
          color: #9c9a9a;
          font-size: 14px;
        }
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
}
</style>