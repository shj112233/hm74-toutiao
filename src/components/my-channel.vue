<template>
  <el-select :value="value"
             change="fn">
    <el-option v-for="item in channelOptions"
               :key="item.id"
               :label="item.name"
               :value="item.id">
    </el-option>
  </el-select>
</template>
<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {

      channelOptions: [] //  此项数据没有 就要定义 并且要向后台发请求
    }
  },
  //  什么时候发请求-》 当组件初始化完毕的时候发请求
  created () {
    // 调用频道数据方法 给channelOptions
    this.getChannelOptions()
  },
  //  发请求的方法 会封装到methods里面
  methods: {
    fn (value) {
      //  value是你选中的值
      this.$emit('input', value)
    },
    //  获取频道数据的方法
    async getChannelOptions () {
      // res==>{data:响应内容} ==》{data:{data:{channels:[{id,name}]}}}
      //  解构赋值  const {data:{data}} = res
      const { data: { data } } = await this.$http.get('channels') //  这个channels是路径
      this.channelOptions = data.channels //  这个channels是从后端获取的数据
    }
  }
}
</script>
<style scoped lang="less">
</style>
