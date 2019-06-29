import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import zhlocale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n  中国语言
import enLocale from 'element-ui/lib/locale/lang/en'
import VueI18n from 'vue-i18n'
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * This project originally used easy-mock to simulate data,
 * but its official service is very unstable,
 * and you can build your own service if you need it.
 * So here I use Mock.js for local emulation,
 * it will intercept your request, so you won't see the request in the network.
 * If you remove `../mock` it will automatically request easy-mock data.
 */
//import '../mock' // 如果隐藏访问自定义数据来源，如果隐藏拦截数据老来源

Vue.use(ElementUI)
Vue.use(VueI18n)
Vue.config.lang = 'zh-cn'
Vue.locale('zh-cn', zhlocale)
Vue.locale('en', enLocale)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
