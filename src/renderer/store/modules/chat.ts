import dayjs from "dayjs"
import Store from "electron-store"
import electron from 'electron';

const ipcRenderer = require("electron").ipcRenderer
import { Message } from "element-ui"
import Vue from "vue"
import { GlobalEvent, defaultCwd } from '@/constant'
import constant from '@/constant'
import { constants } from "original-fs";
const path = require('path');

const Conf = require('conf');
const fs = require('fs')
const groupChatSelfConfigName = "__self"
const selfId = -100
const defaultMsg = {
  id: 0,
  from: constant.MSG_FROM_SYSTEM,
  data: '你们已成为好友',
  time: "0001-01-01T00:00:00+08:00"
}

const defaultGroupMsg = {
  id: 0,
  from: constant.MSG_FROM_SYSTEM,
  data: '你已加入群聊',
  time: "0001-01-01T00:00:00+08:00"
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
  preset: null,
}

var opts = {
  cwd: path.join(defaultCwd, "chat-list"),
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



const getGroupChatConfStore: Function = (state, id) => {
  var currentChat = getChat(state, id);
  if (currentChat != null) {
    let currentChatstores = {};
    currentChat.wechatId.push(groupChatSelfConfigName)
    currentChat.wechatId.forEach(item => {
      var currentChatConfigOpts = {
        cwd: path.join(defaultCwd, "chat", currentChat.user),
        configName: item
      };
      let currentChatstore = new Conf(currentChatConfigOpts);
      currentChatstores[item] = currentChatstore;
    });

    return currentChatstores;

  }
  else { return null; }
}


const getGroupChatConfStoreByName: Function = (state, name) => {
  var currentChat = getChatByName(state, name);
  if (currentChat != null) {

    let currentChatstores = {};
    currentChat.wechatId.forEach(item => {
      var currentChatConfigOpts = {
        cwd: path.join(defaultCwd, "chat", currentChat.user),
        configName: item
      };
      let currentChatstore = new Conf(currentChatConfigOpts);
      currentChatstores[item] = currentChatstore;
    });

    return currentChatstores;


  } else { return null; }
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

  } else { return null; }
}


const mutations = {
  changeChat: (state, id) => {
    let currentChat = getChat(state, id);
    if (currentChat.wechatId instanceof Array) {
      let currentChatstores = getGroupChatConfStore(state, id);
      var currentChatPayloads = []

      var opts = {
        cwd: defaultCwd,
        configName: 'group_config'

      };
      var group_store = new Conf(opts);
      var group_state = group_store.get('data', null)
      if (group_state == null) {
        return
      }
      var group_index = group_state.group.findIndex((group) => {
        return group.name == currentChat.user
      })
      var currentGroup = group_state.group[group_index]
      for (var key in currentChatstores) {
        var currentChatstore = currentChatstores[key];

        let currentChatPayload = currentChatstore.get('data', null)
        if (currentChatPayload != null) {
        }
        else {

          var currentMember = currentGroup.member.find((member) => {
            return member.name == key
          })
          if (currentMember != null) {
            currentChatPayload = {
              id: currentMember.id,
              user: currentMember.name,
              desc: currentMember.desc,
              region: currentMember.region,
              wechatId: currentMember.wechatId,
              sex: currentMember.sex,
              avatar: currentMember.avatar,
              msgs: []
            }
          }
          else {
            if (key == groupChatSelfConfigName) {
              var opts = {
                cwd: defaultCwd,
                configName: 'self_config'

              };

              var selfState = new Conf(opts).get('data', def);
              if (selfState != null) {
                let currentMemberAsSelf = selfState.self;
                currentChatPayload = {
                  id: selfId,
                  user: currentMemberAsSelf.name,
                  desc: currentMemberAsSelf.desc,
                  region: currentMemberAsSelf.region,
                  wechatId: currentMemberAsSelf.wechatId,
                  sex: currentMemberAsSelf.sex,
                  avatar: currentMemberAsSelf.avatar,
                  msgs: []
                }
              }
              else {
                continue;
              }
            }
          }
          currentChatstore.set("data", currentChatPayload)
        }
        Vue.set(currentChatPayloads, currentChatPayloads.length, currentChatPayload)
      }
      var newModel = {}
      newModel['id'] = currentChat.id;
      newModel['wechatId'] = currentGroup.id;
      newModel['user'] = currentGroup.name;
      newModel['notice'] = currentGroup.notice;
      newModel['myName'] = currentGroup.myName;
      newModel['remarkName'] = currentGroup.remarkName;
      newModel['type'] = "groupChat";

      newModel['chats'] = currentChatPayloads;
      state._nowChat = newModel;

    }
    else {
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
      currentChatPayload['type'] = "chat";
      state._nowChat = currentChatPayload;
    }

  },

  pushMessage: (state, msg) => {
    let currentChat = getChat(state, msg.chat_id);
    if (currentChat.wechatId instanceof Array) {

      var configFileName = msg.from != constant.MSG_FROM_SELF ? msg.from : groupChatSelfConfigName
      if ((currentChat.wechatId as Array<string>).indexOf(configFileName) == -1 && configFileName != groupChatSelfConfigName) {
        return
      }
      var currentChatConfigOpts = {
        cwd: path.join(defaultCwd, "chat", currentChat.user),
        configName: configFileName
      };
      let currentChatstore = new Conf(currentChatConfigOpts);
      let currentChatPayload = currentChatstore.get('data', null)
      if (currentChatPayload == null) {
        if (msg.from != constant.MSG_FROM_SELF) {
          var opts = {
            cwd: defaultCwd,
            configName: 'group_config'

          };
          var group_store = new Conf(opts);
          var group_state = group_store.get('data', null)
          var group_index = group_state.group.findIndex((group) => {
            return group.name == currentChat.user
          })
          var currentGroup = group_state.group[group_index]
          var currentMember = currentGroup.member.find((member) => {
            return member.name == configFileName
          })
          if (currentMember != null) {

            currentChatPayload = {
              user: currentMember.name,
              desc: currentMember.desc,
              region: currentMember.region,
              wechatId: currentMember.wechatId,
              sex: currentMember.sex,
              avatar: currentMember.avatar,
              msgs: [defaultGroupMsg]
            }
            currentChat.msgs.push(defaultGroupMsg)
          }
          else {
            return;
          }
        }
        else {
          var opts = {
            cwd: defaultCwd,
            configName: 'self_config'
          };
          var selfState = new Conf(opts).get('data', def);
          if (selfState != null) {
            let currentMemberAsSelf = selfState.self;
            currentChatPayload = {
              id: selfId,
              user: currentMemberAsSelf.name,
              desc: currentMemberAsSelf.desc,
              region: currentMemberAsSelf.region,
              wechatId: currentMemberAsSelf.wechatId,
              sex: currentMemberAsSelf.sex,
              avatar: currentMemberAsSelf.avatar,
              msgs: []
            }
          }
          else {
            return
          }
        }
      }

      let fromStr = constant.MSG_FROM_SELF
      if (msg.from != constant.MSG_FROM_SELF) {
        fromStr = constant.MSG_FROM_OPPOSITE
      }
      let newId = currentChatPayload.msgs.length

      var newMsg = {
        id: newId,
        type: msg.type,
        from: fromStr,
        data: msg.data,
        time: msg.time,
      }
      currentChatPayload.msgs.push(newMsg);
      currentChatstore.set("data", currentChatPayload)
      currentChat.msgs = [];
      currentChat.msgs.push(newMsg)

      if (state._nowChat.id == msg.chat_id) {
        if (msg.from != constant.MSG_FROM_SELF) {
          state._nowChat.chats.forEach(currentNowChat => {
            if (currentNowChat.user == msg.from) {
              Vue.set(currentNowChat.msgs, currentNowChat.msgs.length, newMsg)
              Vue.set(state._nowChat.chats, state._nowChat.chats.indexOf(currentNowChat), currentNowChat)
            }
          });
        }
        else {
          state._nowChat.chats.forEach(currentNowChat => {
            if (currentNowChat.id == selfId) {
              Vue.set(currentNowChat.msgs, currentNowChat.msgs.length, newMsg)
              Vue.set(state._nowChat.chats, state._nowChat.chats.indexOf(currentNowChat), currentNowChat)
            }
          });
        }
      }

      GlobalEvent.emit("pubmsg")

    }
    else {

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
      let newId = currentChatPayload.msgs.length
      let newMsg = {
        id: newId,
        type: msg.type,
        from: msg.from,
        data: msg.data,
        time: msg.time,
      }
      currentChatPayload.msgs.push(newMsg);
      currentChatstore.set("data", currentChatPayload)
      currentChat.msgs = [];
      currentChat.msgs.push(newMsg)
      if (state._nowChat.id == msg.chat_id) {
        Vue.set(state._nowChat.msgs, state._nowChat.msgs.length, newMsg)
      }
      GlobalEvent.emit("pubmsg")
    }
  },
  changePreset: (state, name) => {
    var defaultPreset = {
      f1: {
        type: 1,
        from: constant.MSG_FROM_SELF,
        data: "你好啊，朋友",
      },
      f2: {
        type: 1,
        from: constant.MSG_FROM_SELF,
        data: "您有深入了解过吗？",
      },
      f3: {
        type: 1,
        from: constant.MSG_FROM_SELF,
        data: "您什么时候方便，我们通个微信电话",
      },
      f4: {
        type: 1,
        from: constant.MSG_FROM_SELF,
        data: "我能理解您的心情",
      },
      f6: {
        type: 1,
        from: constant.MSG_FROM_SELF,
        data: "给您造成的不便非常抱歉，我们的心情跟您一样",
      },
    };
    var currentChatConfigOpts = {
      cwd: path.join(defaultCwd, "chat-list"),
      configName: name
    };
    let currentChatstore = new Conf(currentChatConfigOpts);
    let currentChatPayload = currentChatstore.get('data', null)
    if (currentChatPayload == null) {
      currentChatPayload = defaultPreset;
      currentChatstore.set("data", currentChatPayload)
    }
    Vue.set(state, "preset", currentChatPayload)
  },

  changeNowUser: (state, nowUser) => {
    Vue.set(state, "nowUser", nowUser)
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
      store.set("data", state)

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
        fs.unlinkSync(file);
      }
      state.chats.splice(chat_index, 1)

      if (chat_index == state._nowChat.id) {
        state._nowChat = null;

      }
      store.set("data", state)
    }
  },
  close: (state) => {
    state._nowChat = null;
    state.preset = null;
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
  preset: (state) => state.preset,

}

export default {
  state,
  mutations,
  getters,
}
