//  插件注册机制
// 封装一个vue插件 完成当前文件夹所在的所有的组件全局注册
//  当导入这个模块  使用vue.use(使用这个模块) Vue会调用install函数  并且默认传入Vue对象
import MyBread from '../components/my-bread.vue'
import MyChannel from '../components/my-channel.vue'
export default {
  install (Vue) {
    //  使用Vue对象去做你的业务即可
    //  进行组件注册
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyChannel.name, MyChannel)
    // ... 进行注册即可
  }
}
