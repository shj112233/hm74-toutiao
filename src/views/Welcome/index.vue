<template>
  <div class="container">
    <!-- <img src="../../assets/images/welcome.jpg"
         alt=""> -->
  </div>
</template>
<script>
export default {
  //  钩子函数 获取所有的变量和所有的对象
  created () {
    this.$http.get('articles').then(res => console.log(res.data))
  }
}
</script>
<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;
  background: url(../../assets/images/welcome.jpg) no-repeat center;
}
</style>
