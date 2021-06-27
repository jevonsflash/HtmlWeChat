<template>
  <div id="detail" v-if="msg != null">
    <contacts-header class="header" style="-webkit-app-region: drag">
    </contacts-header>
    <div class="main-frame">
      <div class="grid">
        <div v-for="item of miniprograms" :key="item.title">
          <div class="block" slot="reference">
            <el-row>
              <el-col :span="24" style="text-align: center"
                ><el-avatar
                  class="miniprograme-img"
                  :src="item.url"
                  shape="circle"
                  :size="50"
                ></el-avatar
              ></el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="miniprograme-title">
                <span>{{ item.title }}</span></el-col
              >
            </el-row>

            <span class="title">{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import ContactsHeader from "@/components/contacts/contacts_header.vue";
import ContactDetail from "@/components/dialogs/contact_detail.vue";
import Vue from "vue";
var Enumerable = require("linq");

export default Vue.extend({
  components: {
    ContactsHeader,
    ContactDetail,
  },
  props: ["msg"],
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

  .grid {
    position: relative;
    display: grid;
    width: 100%;
    grid-template-columns: repeat(auto-fill, 80px);

    .title {
      margin-top: 13px;
      margin-bottom: 13px;
      font-size: 14px;
      color: #8492a6;
      text-align: center;
    }
    .block {
      flex: 1;
      display: flex;
      flex-direction: column;
      flex-grow: 0;
    }
  }

  .header-title {
    text-align: left;
    font-size: 20px;
  }
  .header-desc {
    text-align: left;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.5);
  }
  .avatar {
    float: right;
  }
  .main-frame {
    padding: 15px 70px;
    background-color: #f5f5f5;
    height: 100%;
    overflow: hidden;
  }

  .header {
    height: 60px;
  }
  .title {
    text-align: left;
    font-size: 20px;
    font-weight: 400;
  }

  .miniprograme-title {
    text-align: center;
    font-size: 12px;
    margin-top: 10px;
  }
}
</style>