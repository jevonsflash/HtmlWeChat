import dayjs from "dayjs"
import LocalStore from "@/store/LocalStore"
const ipcRenderer = require("electron").ipcRenderer
import { Message } from "element-ui"
import Vue from "vue"
import {GlobalEvent} from '@/constant.ts'
import constant from '@/constant.ts'

const store = new LocalStore()

const def = {
  self: {
    avatar: require("../../assets/avatar.jpg"),
  },


}

const state = store.get('data', def)
// const state = def
state._nowChat = state.chats[0]

const mutations = {
 
  changeAvatar: (state, avatar) => {
    console.log("更换头像")
    state.self.avatar = avatar
  },
}

const getters = {
  self: (state) => state.self,

}

export default {
  state,
  mutations,
  getters,
}
