<template>
 <el-dialog
    :modal="false"
    title="发送文件"
    :visible="visible"
    @close="rowDialogClose"
  >
  <div id="dialog_call">
      <el-form ref="form" :rules="rules" :model="msg" style="width:100%">
        <el-form-item label="类型" prop="type">
          <el-select v-model="msg.type" placeholder="请选择类型" style="width:100%">
            <el-option
              label="语音"
              value="语音">
            </el-option>
            <el-option
              label="视频"
              value="视频">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时长" prop="len">
          <el-input v-model="msg.len" placeholder="时长，例如：00:43"></el-input>
        </el-form-item>
      </el-form>
      
      <el-button @click="submit" style="width:100%;">发 送</el-button>
  </div>
 </el-dialog>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import constant from '../../constant'
import { mapGetters, mapMutations } from 'vuex'
import Vue from 'vue'
export default Vue.extend({
  
  props: ['event'],
  data() {
    return {
      visible: false,
      msg: {
        type: '语音',
        len: ''
      },
      rules: {
        len: [{ required: true, message: '请输入时长', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['nowChat', 'self', 'nowUser'])
  },
  methods: {
    ...mapMutations(['pushMessage']),
    rowDialogClose() {
      this.visible = false
    },
    async submit() {
      try {
        await (this.$refs.form as any).validate()
        if (this.msg.type == '语音') {
          this.pushMessage({
            chat_id: this.nowChat.id,
            type: constant.MSG_TYPE_VOICE_CALL,
            from: this.nowUser,
            data: { len: this.msg.len },
            time: dayjs().format( )
          })
        } else {
          this.pushMessage({
            chat_id: this.nowChat.id,
            type: constant.MSG_TYPE_VIDEO_CALL,
            from: this.nowUser,
            data: { len: this.msg.len },
            time: dayjs().format( )
          })
        }
      } catch (err) {}
    },
    open() {
      this.visible = true
    }
  },
  created() {
    this.event.on('open', this.open)
  }
})
</script>

<style scoped>
</style>