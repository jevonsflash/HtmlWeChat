<template>
    <div>
        <el-row>
          <el-col :span="24">
            <div class="weui-grids">
              <div
                class="weui-grid"
                v-for="item of miniprograms"
                :key="item.title"
                
              >
                <div class="block">
                  <el-row>
                    <el-col :span="24">
                      <el-avatar
                        :src="item.url"
                        shape="square"
                        :size="35"
                      ></el-avatar
                    ></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <span class="title">{{ item.title }}</span></el-col
                    >
                  </el-row>
                </div>
              </div>
            </div></el-col
          >
        </el-row>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
var Enumerable = require("linq");

export default Vue.extend({
created(){
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

    data(){
        return{
            miniprograms:{

            }

        }
    }
})
</script>