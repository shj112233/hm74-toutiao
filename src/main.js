import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 1 默认索引 文件夹下存在 index.js index.vue index.json默认加载这些文件
//  在使用vue-cli 的时候  @符号在路径中作为前缀使用的时候  代表src目录
import router from './router'
// import router from '@/router'
import axios from './api/axios.js'
import components from '@/components'
Vue.use(components)
// //  基准路径
// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// // token 认证
// axios.defaults.headers = {
//   Authorization:
//     'Bearer ' + JSON.parse(window.sessionStorage.getItem('hm74-toutiao')).token
// }
Vue.prototype.$http = axios

Vue.use(ElementUI)
Vue.config.productionTip = false

// main.js 的职责是 1.导入项目所需要的资源（包  css。。。）
//                 2.初始化根实例  new Vue()  render  的作用是 把某一个APP组件渲染在你指定的容器（$mount("#app")）内

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
