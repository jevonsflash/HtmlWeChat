import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'
import User from './modules/User'
import self from './modules/self'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    User,self
  },
  strict: process.env.NODE_ENV !== 'production'
})
