//  配置axios
import axios from 'axios'

const instance = axios.create({
  // 配置对象    基准路由   头部信息
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/',
  headers: {
    // Authorization:
    //   'Bearer ' +
    //   JSON.parse(window.sessionStorage.getItem('hm74-toutiao')).token
  }
})

//  请求拦截
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
export default instance
