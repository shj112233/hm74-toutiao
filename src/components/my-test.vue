<template>
  <div class="container">
    <p>头部</p>
    <p>
      <slot name="header"
            :text="'abc'"></slot>
    </p>
    <p>底部</p>
  </div>
</template>
<script>
export default {
  // 组件内部数据
  data () {
    return {
      //  每个组件 的内部数据时独立的  组件之间传值需要用到父传子 子传父 非父子之间的传值
      innerData: '组件内部数据'
    }
  }
}
</script>
<style scoped lang="less">
</style>
