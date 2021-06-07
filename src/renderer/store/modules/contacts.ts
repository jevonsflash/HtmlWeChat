import dayjs from "dayjs"
import electron from 'electron';
const ipcRenderer = require("electron").ipcRenderer
import { Message } from "element-ui"
import Vue from "vue"
import {GlobalEvent,defaultCwd} from '@/constant.ts'
import UserInfo from "@/model/userInfo";
const Conf = require('conf');


const def = {
  contacts: []
}

var opts = {
  cwd: defaultCwd,
  configName: 'contacts_config'

};
const store = new Conf(opts);
const state = store.get('data', def)


const mutations = {
 
  changeAvatar: (state, data:UserInfo) => {
    console.log("更换头像")
    let contact_index = state.contacts.findIndex((contact) => {
      return contact.wechatId == data.wechatId
    })
    state.contacts[contact_index].avatar = data.avatar
    state.contacts[contact_index].name = data.name
    state.contacts[contact_index].desc = data.desc
    state.contacts[contact_index].remarkName = data.remarkName
    state.contacts[contact_index].region = data.region
  },


  pushContact: (state, contact:UserInfo) => {
    state.contacts.push(contact)
  },
  delContact: (state, id) => {
    console.log('delContact2')
    let contact_index = state.contacts.findIndex((contact) => {
      return contact.id == id
    })
    state.contacts.splice(contact_index, 1)
  },
  close: (state) => {
    store.set("data", state)
    setTimeout(() => {
      ipcRenderer.send("window-close")
    }, 1000)
  },
}




const getters = {
  contacts: (state) => state.contacts,

}

export default {
  state,
  mutations,
  getters,
}
