// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/index.vue'
import Home from '../views/Home/index.vue'
import Welcome from '../views/Welcome/index.vue'
import NotFound from '../views/NotFound/index.vue'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { name: 'login', path: '/login', component: Login },
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [{ name: 'welcome', path: '/', component: Welcome }]
    },
    //  前边很多规则都不好使 就走到这步
    { name: '404', path: '*', component: NotFound }
  ]
})
export default router
