<template>
  <div id="dialog_add_chat">
  <el-dialog title="添加聊天" :visible="visible" @close="rowDialogClose">
      <el-form ref="form" :rules="rules" :model="msg" style="width:100%">
        <el-form-item label="名字" prop="name">
          <el-input v-model="msg.name" placeholder="名字"></el-input>
        </el-form-item>
        <el-form-item class="image" label="头像" prop="avatar">
          <!-- <el-input v-model="msg.avatar" placeholder="头像URL"></el-input> -->
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :http-request="upImg">
            <p v-if="!msg.avatar">点击选择</p>
            <img v-else :src="msg.avatar" alt="">
          </el-upload>
        </el-form-item>
      </el-form>
      
      <el-button @click="submit" style="width:100%;">添 加</el-button>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
  


import lrz from 'lrz'
import dayjs from 'dayjs'
import constant from "@/constant";
import { mapGetters, mapMutations } from 'vuex'
import UserInfo from '@/model/userInfo';
export default Vue.extend({
  props: ['event'],
  data() {
    return {
      visible: false,
      msg: null,
      rules: {
        name: [{ required: true, message: '请输入名字', trigger: 'blur' }],
        avatar: [{ required: true, message: '请输入头像地址', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['chats'])
  },
  methods: {
    ...mapMutations(['pushChat']),
    rowDialogClose() {
      this.visible = false
    },
    async submit() {
      try {
        await (this.$refs.form as any).validate()
        this.pushChat({
          id: this.chats.length,
          user: this.msg.name,
          avatar: this.msg.avatar,
          msgs: [
            {
              id: 0,
              from: constant.MSG_FROM_SYSTEM,
              data: '你们已成为好友'
            },
            {
              id: 1,
              type: constant.MSG_TYPE_TEXT,
              from: constant.MSG_FROM_OPPOSITE,
              data: '你好,你的头像是'+this.msg.avatar,
              time: dayjs().format( )
            }
          ],
          last_msg: {
            id: 1,
            type: constant.MSG_TYPE_TEXT,
            from: constant.MSG_FROM_OPPOSITE,
            data: '你好',
            time: dayjs().format( )
          }
        })
      } catch (err) {}
    },
    open() {
      this.visible = true
    },
    async upImg(req) {
      try {
        let file = req.file
        let lrzfile = await lrz(file)
        this.msg.avatar = lrzfile.base64
      } catch (err) {}
    }
  },
  created() {
    this.msg=new UserInfo()
    this.event.on('open', this.open)
  }
})
</script>

<style scoped>
.image {
  display: flex;
  align-items: center;
}
img {
  width: 100px;
  height: 100px;
}
</style>