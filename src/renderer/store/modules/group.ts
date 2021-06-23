import dayjs from "dayjs"
import electron from 'electron';
const ipcRenderer = require("electron").ipcRenderer
import { Message } from "element-ui"
import Vue from "vue"
import {GlobalEvent,defaultCwd} from '@/constant.ts'
import UserInfo from "@/model/userInfo";
const Conf = require('conf');


const def = {
  contacts: [
    {
      name: "小珂",
      desc: "这是小柯的空间",
      region: "广东 广州",
      wechatId: "wxid-0123546516",
      sex: "男",
      avatar: require("@/assets/defaultAvatars/2.png"),
    },
    {
      name: "强哥",
      desc: "阿里巴巴集团首席风险官（CRO）",
      region: "广东 广州",
      wechatId: "wxid-0123546516",
      sex: "男",
      avatar: require("@/assets/defaultAvatars/3.png"),
    },
    {
      name: "何伟",
      desc: "小微金融服务集团（筹）行业产品部研究员",
      region: "广东 广州",
      wechatId: "wxid-0123546516",
      sex: "男",
      avatar: require("@/assets/defaultAvatars/4.png"),
    },
    {
      name: "治铭",
      desc: "花名行癫",
      region: "广东 广州",
      wechatId: "wxid-0123546516",
      sex: "男",
      avatar: require("@/assets/defaultAvatars/5.png"),
    },
    {
      name: "哈雷镜少年",
      desc: "花名铁木真",
      region: "广东 广州",
      wechatId: "wxid-0123546516",
      sex: "男",
      avatar: require("@/assets/defaultAvatars/6.png"),
    },
    {
      name: "陈春",
      desc: "花名苗人凤",
      region: "广东 广州",
      wechatId: "wxid-0123546516",
      sex: "男",
      avatar: require("@/assets/defaultAvatars/7.png"),
    },
    {
      name: "洛美",
      desc: "美美哒美美哒",
      region: "广东 广州",
      wechatId: "wxid-0123546516",
      sex: "男",
      avatar: require("@/assets/defaultAvatars/8.png"),
    },
    {
      name: "倪行军",
      desc: "花名翼捷",
      region: "广东 广州",
      wechatId: "wxid-0123546516",
      sex: "男",
      avatar: require("@/assets/defaultAvatars/9.png"),
    }



  ]
}

var opts = {
  cwd: defaultCwd,
  configName: 'contacts_config'

};
const store = new Conf(opts);
const state = store.get('data', def)


const mutations = {
 
  updateGroup: (state, data:UserInfo) => {
    console.log("更换头像")
    let contact_index = state.contacts.findIndex((contact) => {
      return contact.wechatId == data.wechatId
    })
    state.contacts[contact_index].avatar = data.avatar
    state.contacts[contact_index].name = data.name
    state.contacts[contact_index].desc = data.desc
    state.contacts[contact_index].remarkName = data.remarkName
    state.contacts[contact_index].region = data.region
    state.contacts[contact_index].sex = data.sex
  },


  pushGroup: (state, contact:UserInfo) => {
    state.contacts.push(contact)
  },
  delGroup: (state, id) => {
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
