import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'
import chat from './modules/chat'
import self from './modules/self'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    chat,self
  },
  strict: process.env.NODE_ENV !== 'production'
})
