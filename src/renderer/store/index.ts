import Vue from 'vue'
import Vuex from 'vuex'

import chat from './modules/chat'
import self from './modules/self'
import contacts from './modules/contacts'


Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    chat,self,contacts
  },
  strict: process.env.NODE_ENV !== 'production'
})
