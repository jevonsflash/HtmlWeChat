<template>
  <el-dialog
    :modal="false"
    title="发送文件"
    :visible="visible"
    @close="rowDialogClose"
  >
    <div style="height:350px">
      <el-tabs :tab-position="tabPosition">
        <el-tab-pane label="发送文件" @click.native="actionHandler('file')">
          <dialog-file></dialog-file>
        </el-tab-pane>
        <el-tab-pane label="发送语音" @click.native="actionHandler('voice')">
          <dialog-voice></dialog-voice>
        </el-tab-pane>
        <el-tab-pane label="发送转账" @click.native="actionHandler('transter')"
          ><dialog-transfer></dialog-transfer
        ></el-tab-pane>
        <el-tab-pane
          label="发送图片和视频"
          @click.native="actionHandler('img_video')"
          ><dialog-img-video></dialog-img-video
        ></el-tab-pane>
      
        <el-tab-pane
          label="发送系统消息"
          @click.native="actionHandler('system')"
        >
          <dialog-system></dialog-system
        ></el-tab-pane>
      </el-tabs>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import Vue from "vue";

import DialogFile from "@/components/dialogs/file.vue";
import DialogTransfer from "@/components/dialogs/transfer.vue";
import DialogImgVideo from "@/components/dialogs/img_video.vue";
import DialogVoice from "@/components/dialogs/voice.vue";
import DialogSystem from "@/components/dialogs/system.vue";
import DialogChangeInfo from "@/components/dialogs/change_info.vue";
import DialogCall from "@/components/dialogs/call.vue";

export default Vue.extend({
  components: {
    DialogFile,
    DialogTransfer,
    DialogImgVideo,
    DialogVoice,
    DialogSystem,
    DialogChangeInfo,
    DialogCall,
  },
  props: ["event"],

  data() {
    return {
      tabPosition: "top",
      visible: false,
    };
  },

  created() {
    this.event.on("open", this.open);
  },
  methods: {
    actionHandler(action) {},
    open() {
      this.visible = true;
    },
    rowDialogClose() {
      this.visible = false;
    },
  },
});
</script>