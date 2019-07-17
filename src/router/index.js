// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/index.vue'
import Home from '../views/Home/index.vue'
import Welcome from '../views/Welcome/index.vue'
import NotFound from '../views/NotFound/index.vue'
import Article from '../views/article'
import Setting from '../views/Setting'
import Image from '../views/image'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { name: 'login', path: '/login', component: Login },
    {
      // name: 'home',
      path: '/',
      component: Home,
      children: [
        { name: 'welcome', path: '/', component: Welcome },
        { name: 'article', path: '/article', component: Article },
        { name: 'setting', path: '/setting', component: Setting },
        { name: 'image', path: '/image', component: Image }
      ]
    },
    //  前边很多规则都不好使 就走到这步
    { name: '404', path: '*', component: NotFound }
  ]
})
// 拦截未登录的路由
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const user = window.sessionStorage.getItem('hm74-toutiao')
  if (user) return next()
  next('/login')
})
export default router
