<template>
  <div>
    
      <el-tabs :tab-position="tabPosition">
        <el-tab-pane label="发送文件" @click.native="actionHandler('file')"
          >
          <dialog-file></dialog-file>
          </el-tab-pane
        >
        <el-tab-pane label="发送语音" @click.native="actionHandler('voice')"
          >
          <dialog-voice></dialog-voice>
          </el-tab-pane
        >
        <el-tab-pane label="发送转账" @click.native="actionHandler('transter')"
          ><dialog-transfer></dialog-transfer></el-tab-pane
        >
        <el-tab-pane label="发送图片和视频" @click.native="actionHandler('img_video')"
          ><dialog-img-video></dialog-img-video></el-tab-pane
        >
        <el-tab-pane label="发送视频或语音通话" @click.native="actionHandler('call')"
          ><dialog-voice ></dialog-voice></el-tab-pane
        >
        <el-tab-pane label="发送系统消息" @click.native="actionHandler('system')"
          > <dialog-system ></dialog-system></el-tab-pane
        >
        <el-tab-pane label="修改双方信息" @click.native="actionHandler('set_user')"
          ><dialog-change-info></dialog-change-info></el-tab-pane
        >

        <el-tab-pane label="切换为自己" @click.native="actionHandler('change_user_self')"
          ></el-tab-pane
        >
        <el-tab-pane label="切换为对方" @click.native="actionHandler('change_user_opposite')"
          ></el-tab-pane
        >
      </el-tabs>
  
  </div>
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
   data() {
      return {
        tabPosition: 'left'
      };
    },
    methods:{
            actionHandler(action) {

    }
    }

    
});
</script>