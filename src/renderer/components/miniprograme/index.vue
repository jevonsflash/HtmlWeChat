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
<el-row >
        <el-col :span="24">
          <el-avatar
            class="avatar"
            shape="circle"
            :size="60"
          ></el-avatar>
        </el-col>

        <el-col :span="24">
          <span class="next-desc ">还没有我的小程序</span>
        </el-col>
         <el-col :span="24">
          <span class="next-desc ">选中小程序右键可添加</span>
        </el-col>
      </el-row>

    <el-row>
      <el-col :span="24"> </el-col>
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

<style lang="scss">
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
  .title-frame-right {
    margin-right: 40px;
    margin-top: 20px;
  
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
}
</style>