import Vue from 'vue'
import axios from 'axios'

import App from './App.vue'
import router from '@/router'
import store from './store'
import SvgIcon from 'vue-svgicon'
import EventEmitter from 'eventemitter3'
import {GlobalEvent} from '@/constant'


import '@/style/normalize.css'
import '@/style/weui.css'

import '@/icons/components'

import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.prototype.$http = axios
Vue.config.productionTip = false

ElementUI.install(Vue,{
  locale: undefined,
  i18n: undefined,
  size: 'medium'
})

Vue.prototype.$expressions = []
for (let i = 1; i <= 249; i++) {
  let img = require(`./assets/expressions/${i}.png`)
  Vue.prototype.$expressions.push({
    img,
    index: i
  })
}

Vue.prototype.$globalEvent = GlobalEvent


Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})


/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
