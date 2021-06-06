import dayjs from "dayjs"
import Store from "electron-store"
const ipcRenderer = require("electron").ipcRenderer
import { Message } from "element-ui"
import Vue from "vue"
import {GlobalEvent} from '@/constant.ts'
import constant from '@/constant.ts'

const store = new Store()

const def = {
  self: {
    avatar: require("../../assets/avatar.jpg"),
  },


}

const state = store.get('data', def)
// const state = def
state._nowChat = state.chats[0]

const mutations = {
  changeChat: (state, id) => {
    state._nowChat = state.chats.find((it) => it.id == id)
  },
  changeNowChatInfo: (state, chat) => {
    if (state._nowChat) {
      state._nowChat.user = chat.user
      state._nowChat.avatar = chat.avatar
      state._nowChat = state._nowChat
    } else {
      state.chats[0].user = chat.user
      state.chats[0].avatar = chat.avatar
      state.chats = state.chats
    }
  },
  pushMessage: (state, msg) => {
    for (let i = 0; i < state.chats.length; i++) {
      let chat = state.chats[i]
      if (chat.id == msg.chat_id) {
        chat.msgs.push(msg)
      }
    }
    GlobalEvent.emit("pubmsg")
  },
  delMsg: (state, id) => {
    let nowChat = state._nowChat || state.chats[0]
    nowChat.msgs = nowChat.msgs.filter((msg) => {
      return msg.id != id
    })
  },
  changeNowUser: (state, nowUser) => {
    state.nowUser = nowUser
  },
  pushChat: (state, chat) => {
    state.chats.push(chat)
  },
  delChat: (state, id) => {
    let chat_index = state.chats.findIndex((chat) => {
      return chat.id == id
    })
    state.chats.splice(chat_index, 1)
  },
  close: (state) => {
    store.set("data", state)
    Message.success(`数据已保存`)
    setTimeout(() => {
      ipcRenderer.send("window-close")
    }, 1000)
  },
  changeAvatar: (state, avatar) => {
    console.log("更换头像")
    state.self.avatar = avatar
  },
}

const getters = {
  self: (state) => state.self,
  chats: (state) => state.chats,
  nowChat: (state) => {
    if (!state._nowChat) {
      state._nowChat = state.chats[0] || {}
    }
    return state._nowChat
  },
  nowUser: (state) => state.nowUser,
}

export default {
  state,
  mutations,
  getters,
}
