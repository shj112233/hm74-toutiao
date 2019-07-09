import Vue from 'vue'
import App from './App.vue'

import ELEMENT from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 1 默认索引 文件夹下存在 index.js index.vue index.json默认加载这些文件
//  在使用vue-cli 的时候  @符号在路径中作为前缀使用的时候  代表src目录
import router from './router'
// import router from '@/router'
Vue.use(ELEMENT)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
