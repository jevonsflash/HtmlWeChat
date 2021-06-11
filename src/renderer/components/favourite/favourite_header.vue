<template>
  <div id="chat_header">
    <div class="name" style="-webkit-app-region: no-drag">
      <div>
        {{ title }}
      </div>
    </div>
    <div class="actions" style="-webkit-app-region: no-drag">
      <div class="toolbar">
        <div>
          <svg-icon name="fixaction"></svg-icon>
        </div>
        <div>
          <svg-icon name="min" @click="minus"></svg-icon>
        </div>
        <div>
          <svg-icon name="max"></svg-icon>
        </div>
        <div>
          <svg-icon name="close" @click="cross"></svg-icon>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script lang='ts'>
import constant from "@/constant";
import HeaderVue from "@/components/header";
const ipcRenderer = require("electron").ipcRenderer;

import Vue from "vue";

export default HeaderVue.extend({
  props: { title: { type: String, default: "" } },
});
</script>

<style scoped lang="scss">
#chat_header {
  height: 100%;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 15px;
  .name {
    cursor: pointer;
    margin: 0 15px;
    font-size: 18px;
    font-weight: 580;
    color: black;
  }
  .actions {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    .toolbar {
      display: flex;
      div {
        width: 34px;
        height: 26px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        cursor: pointer;
      }
      div:hover {
        background-color: #dfdfdf;
      }
    }

    .more {
      .icon-more {
        cursor: pointer;
        font-size: 24px;
      }
      height: 30px;
      width: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>