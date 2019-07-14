//  配置axios
import axios from 'axios'
//  axios.create 创建实例   当实例改变  配置对象不用改变
const instance = axios.create({
  // 配置对象    基准路由   头部信息
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/',
  headers: {
    // Authorization:
    //   'Bearer ' +
    //   JSON.parse(window.sessionStorage.getItem('hm74-toutiao')).token
  }
})

// 请求拦截
instance.interceptors.request.use(
  config => {
    // 给头部加上认证信息
    const user = window.sessionStorage.getItem('hm74-toutiao')
    if (user) {
      config.headers = {
        Authorization: 'Bearer ' + JSON.parse(user).token
      }
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

//  响应拦截
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      location.hash = '#/login'
      return Promise.reject(error)
    }
  }
)
export default instance
