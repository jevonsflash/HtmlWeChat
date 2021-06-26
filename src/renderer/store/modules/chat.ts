import dayjs from "dayjs"
import Store from "electron-store"
import electron from 'electron';

const ipcRenderer = require("electron").ipcRenderer
import { Message } from "element-ui"
import Vue from "vue"
import { GlobalEvent, defaultCwd } from '@/constant.ts'
import constant from '@/constant.ts'
const path = require('path');

const Conf = require('conf');
const fs = require('fs')
const defaultMsg = {
  id: 0,
  type: constant.MSG_TYPE_TEXT,
  from: constant.MSG_FROM_OPPOSITE,
  data: "微信，是一个生活方式",
  time: dayjs().format("HH:mm"),
}
const def = {

  chats: [
    {
      id: 0,
      user: "小珂",
      desc: "这是小柯的空间",
      region: "广东 广州",
      wechatId: "wxid-0123546516",
      sex: "男",
      avatar: require("@/assets/defaultAvatars/1.png"),
      msgs: [defaultMsg],
    },
    {
      id: 1,
      user: "文件传输助手",
      desc: "这是文件传输助手",
      region: "广东 广州",
      wechatId: "wxid-0123546517",
      sex: "男",
      avatar: require("@/assets/img_assistant.png"),
      msgs: [defaultMsg],
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


const getChat: Function = (state, id) => {
  var currentChat = state.chats.find((it) => it.id == id);
  return currentChat != undefined ? currentChat : null;
}

const getChatByName: Function = (state, name) => {
  var currentChat = state.chats.find((it) => it.user == name);
  return currentChat != undefined ? currentChat : null;
}

const getChatConfStore: Function = (state, id) => {
  var currentChat = getChat(state, id);
  if (currentChat != null) {
    var currentChatConfigOpts = {
      cwd: path.join(defaultCwd, "chat"),
      configName: currentChat.user

    };
    let currentChatstore = new Conf(currentChatConfigOpts);
    return currentChatstore;
  }
  else { return null; }
}


const getChatConfStoreByName: Function = (state, name) => {
  var currentChat = getChatByName(state, name);
  if (currentChat != null) {
    var currentChatConfigOpts = {
      cwd: path.join(defaultCwd, "chat"),
      configName: currentChat.user

    };
    let currentChatstore = new Conf(currentChatConfigOpts);
    return currentChatstore;
  }
  else { return null; }
}

const mutations = {
  changeChat: (state, id) => {
    let currentChat = getChat(state, id);
    let currentChatstore = getChatConfStore(state, id);
    let currentChatPayload = currentChatstore.get('data', null)
    if (currentChatPayload == null) {

      currentChatPayload = {
        id: currentChat.id,
        user: currentChat.user,
        desc: currentChat.desc,
        region: currentChat.region,
        wechatId: currentChat.wechatId,
        sex: currentChat.sex,
        avatar: currentChat.avatar,
        msgs: [defaultMsg]
      }
      currentChat.msgs.push(defaultMsg)

      currentChatstore.set("data", currentChatPayload)
    }
    state._nowChat = currentChatPayload;
  },

  pushMessage: (state, msg) => {
    let currentChat = getChat(state, msg.chat_id);
    let currentChatstore = getChatConfStore(state, msg.chat_id);
    let currentChatPayload = currentChatstore.get('data', null)
    if (currentChatPayload == null) {

      currentChatPayload = {
        id: currentChat.id,
        user: currentChat.user,
        desc: currentChat.desc,
        region: currentChat.region,
        wechatId: currentChat.wechatId,
        sex: currentChat.sex,
        avatar: currentChat.avatar,
        msgs: [defaultMsg]
      }
      currentChat.msgs.push(defaultMsg)
    }
    currentChatPayload.msgs.push(msg);
    currentChatstore.set("data", currentChatPayload)
    currentChat.msgs = [];
    currentChat.msgs.push(msg)
    if (state._nowChat.id == msg.chat_id) {
      state._nowChat.msgs.push(msg);

    }
    GlobalEvent.emit("pubmsg")
  },



  changeNowUser: (state, nowUser) => {
    state.nowUser = nowUser
  },
  pushChat: (state, chat) => {
    let currentChat = getChatByName(state, chat.user);
    if (currentChat != null) {
      // do nothing
    }
    else {
      let currentChatstore = getChatConfStoreByName(state, chat.user);
      if (currentChatstore != null) {
        let currentChatPayload = currentChatstore.get('data', null)
        if (currentChatPayload != null) {
          chat.msgs = currentChatPayload.msgs;
          currentChatPayload.id = chat.id
          currentChatstore.set("data", currentChatPayload)
        }
      }
      state.chats.push(chat)
    }
  },
  delChat: (state, id) => {
    let chat_index = state.chats.findIndex((chat) => {
      return chat.id == id
    })

    if (chat_index != -1) {
      let currentChatstore = getChatConfStore(state, id);
      let currentChatPayload = currentChatstore.get('data', null)
      if (currentChatPayload != null) {
        let file = path.join(defaultCwd, "chat", state.chats[chat_index].user + ".json");
        fs.rm(file);
      }
      state.chats.splice(chat_index, 1)

      if (chat_index == state._nowChat.id) {
        state._nowChat = null;

      }
    }
  },
  close: (state) => {
    state._nowChat = null;
    store.set("data", state)
    setTimeout(() => {
      ipcRenderer.send("window-close")
    }, 1000)
  },

}

const getters = {
  chats: (state) => state.chats,
  nowChat: (state) => state._nowChat,
  nowUser: (state) => state.nowUser,
}

export default {
  state,
  mutations,
  getters,
}
