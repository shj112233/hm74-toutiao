<template>
  <div>
    <img src="../../assets/images/welcome.jpg"
         alt="">
  </div>
</template>
<script>
export default {
  created () {
    this.$http.get('articles').then(res => console.log(res.data))
  }
}
</script>
<style lang="">
</style>
