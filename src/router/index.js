// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/index.vue'
import Home from '../views/Home/index.vue'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { name: 'login', path: '/login', component: Login },
    { name: 'home', path: '/home', component: Home }
  ]
})
export default router
