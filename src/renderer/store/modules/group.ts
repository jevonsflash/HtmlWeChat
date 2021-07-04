import dayjs from "dayjs"
import electron from 'electron';
const ipcRenderer = require("electron").ipcRenderer
import { Message } from "element-ui"
import Vue from "vue"
import { GlobalEvent, defaultCwd } from '@/constant'
import UserInfo from "@/model/userInfo";
import GroupInfo from "@/model/groupInfo";
const Conf = require('conf');


const def = {
  group: [
    {
      id: "群聊1",
      name: "测试群",

      notice: "测试群公告",
      myName: "",
      remarkName: "群聊备注",
      member: [{
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
      }]

    },
    {
      id: "群聊2",
      name: "测试群2",

      notice: "测试群2公告",
      myName: "",
      member: [{
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
      ]

    }

  ]
}

var opts = {
  cwd: defaultCwd,
  configName: 'group_config'

};
const store = new Conf(opts);
const state = store.get('data', def)


const mutations = {

  updateGroup: (state, data: GroupInfo) => {
    console.log("更换头像")
    let group_index = state.group.findIndex((group) => {
      return group.id == data.id
    })
    state.group[group_index].name = data.name
    state.group[group_index].myName = data.myName
    state.group[group_index].notice = data.notice
    state.group[group_index].remarkName = data.remarkName
  },

  pushGroupMember: (state, data:{id:string, member: UserInfo}) => {
    let group_index = state.group.findIndex((group) => {
      return group.id == data.id
    })
    state.group[group_index].member.push(data.member)
    store.set("data", state)

  },

  delGroupMember: (state,  data:{id:string, name: string}) => {
    let group_index = state.group.findIndex((group) => {
      return group.id == data.id
    })

    let member_index = state.group[group_index].member.findIndex((member) => {
      return member.name == data.name
    })
    state.group[group_index].member.splice(member_index, 1)
    store.set("data", state)

  },

  pushGroup: (state, group: GroupInfo) => {
    group.id = state.group.lenth;
    state.group.push(group)
    store.set("data", state)

  },
  delGroup: (state, id) => {
    let group_index = state.group.findIndex((group) => {
      return group.id == id
    })
    state.group.splice(group_index, 1)
    store.set("data", state)

  },
  close: (state) => {
    store.set("data", state)
    setTimeout(() => {
      ipcRenderer.send("window-close")
    }, 1000)
  },
}




const getters = {
  group: (state) => state.group,

}

export default {
  state,
  mutations,
  getters,
}
