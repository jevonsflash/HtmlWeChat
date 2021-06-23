import dayjs from "dayjs"
import Store from "electron-store"
import electron from 'electron';

const ipcRenderer = require("electron").ipcRenderer
import { Message } from "element-ui"
import Vue from "vue"
import { GlobalEvent ,defaultCwd} from '@/constant.ts'
import constant from '@/constant.ts'

const Conf = require('conf');

const def = {

  chats: [
    {
      id: 0,
      user: "新手入门",
      avatar: require("@/assets/defaultAvatars/1.png"),
      msgs: [
        {
          id: 0,
          type: constant.MSG_TYPE_TEXT,
          from: constant.MSG_FROM_OPPOSITE,
          data: "微信，是一个生活方式",
          time: dayjs().format("HH:mm"),
        },
        {
          id: 1,
          type: constant.MSG_TYPE_TEXT,
          from: constant.MSG_FROM_OPPOSITE,
          data:
            "超过十亿人使用的手机应用",
          time: dayjs().format("HH:mm"),
        },
        {
          id: 2,
          type: constant.MSG_TYPE_IMG,
          from: constant.MSG_FROM_OPPOSITE,
          data: require("@/assets/defaultImageMsg/1.png"),
          time: dayjs().format("HH:mm"),
        },
        {
          id: 3,
          type: constant.MSG_TYPE_TEXT,
          from: constant.MSG_FROM_OPPOSITE,
          data:
            "支持发送语音短信、视频、图片和文字<br/>支持发送语音短信、视频、图片和文字<br/>支持发送语音短信、视频、图片和文字<br/>",
          time: dayjs().format("HH:mm"),
        },
        {
          id: 4,
          type: constant.MSG_TYPE_IMG,
          from: constant.MSG_FROM_OPPOSITE,
          data: require("@/assets/defaultImageMsg/2.png"),
          time: dayjs().format("HH:mm"),
        },
        {
          id: 5,
          type: constant.MSG_TYPE_IMG,
          from: constant.MSG_FROM_OPPOSITE,
          data: require("@/assets/defaultImageMsg/3.png"),
          time: dayjs().format("HH:mm"),
        },
        {
          id: 6,
          type: constant.MSG_TYPE_TEXT,
          from: constant.MSG_FROM_OPPOSITE,
          data: "可以群聊，仅耗少量流量，适合大部分智能手机",
          time: dayjs().format("HH:mm"),
        },
      
      ],
    },
    {
      id: 1,
      user: "文件传输助手",
      avatar: require("@/assets/img_assistant.png"),
      msgs: [
        {
          id: 0,
          type: constant.MSG_TYPE_FILE,
          from: constant.MSG_FROM_OPPOSITE,
          data: {
            file_type: constant.FILE_TYPE_WORD,
            name: "新建文本文档.doc",
            size: "26kb",
          },
          time: dayjs().format("HH:mm"),
        },
        {
          id: 1,
          type: constant.MSG_TYPE_VOICE_CALL,
          from: constant.MSG_FROM_OPPOSITE,
          data: {
            len: "00:45",
          },
          time: dayjs().format("HH:mm"),
        },
        {
          id: 2,
          type: constant.MSG_TYPE_VOICE_CALL,
          from: constant.MSG_FROM_SELF,
          data: {
            len: "00:14",
          },
          time: dayjs().format("HH:mm"),
        },
        {
          id: 3,
          type: constant.MSG_TYPE_VIDEO_CALL,
          from: constant.MSG_FROM_SELF,
          data: {
            len: "00:14",
          },
          time: dayjs().format("HH:mm"),
        },
        {
          id: 4,
          type: constant.MSG_TYPE_VIDEO_CALL,
          from: constant.MSG_FROM_OPPOSITE,
          data: {
            len: "00:14",
          },
          time: dayjs().format("HH:mm"),
        },
      ],
    },
  ],
  _nowChat: null,
  nowUser: constant.MSG_FROM_SELF,
}

var opts = {
  cwd: defaultCwd,
  configName: 'chat_config'

};

const store = new Conf(opts);
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
    console.log('delChat2')
    let chat_index = state.chats.findIndex((chat) => {
      return chat.id == id
    })
    state.chats.splice(chat_index, 1)
  },
  close: (state) => {
    store.set("data", state)
    setTimeout(() => {
      ipcRenderer.send("window-close")
    }, 1000)
  },

}

const getters = {
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
