import dayjs from "dayjs"
import electron from 'electron';
const ipcRenderer = require("electron").ipcRenderer
import { Message } from "element-ui"
import Vue from "vue"
import {GlobalEvent,defaultCwd} from '@/constant.ts'
import constant from '@/constant.ts'
import UserInfo from "@/model/userInfo";
const Conf = require('conf');


const def = {
  self: {
    avatar: require("@/assets/avatar.jpg"),
    name: "亚索",
    desc: "吾虽浪迹天涯,却从未迷失本心。",
    remarkName: "快乐风男",
    region: "中国 广州",
    wechatId: "0",
    sex: "男",
  },
}

var opts = {
  cwd: defaultCwd,
  configName: 'self_config'

};
const store = new Conf(opts);
const state = store.get('data', def)


const mutations = {
 
  changeAvatar: (state, data:UserInfo) => {
    state.self.avatar = data.avatar
    state.self.name = data.name
    state.self.desc = data.desc
    state.self.remarkName = data.remarkName
    state.self.region = data.region
    state.self.wechatId = data.wechatId
    state.self.sex = data.sex
  },

  close: (state) => {
    store.set("data", state)
    setTimeout(() => {
      ipcRenderer.send("window-close")
    }, 1000)
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
