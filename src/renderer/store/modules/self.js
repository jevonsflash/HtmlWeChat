import dayjs from "dayjs"
import electron from 'electron';
const ipcRenderer = require("electron").ipcRenderer
import { Message } from "element-ui"
import Vue from "vue"
import {GlobalEvent} from '@/constant.ts'
import constant from '@/constant.ts'
import {defaultCwd} from '@/constant.ts'
const Conf = require('conf');


const def = {
  self: {
    avatar: require("../../assets/avatar.jpg"),
  },
}

var opts = {
  cwd: defaultCwd,
  configName: 'self_config'

};
const store = new Conf(opts);
const state = store.get('data', def)


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
