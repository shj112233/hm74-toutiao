<template>
  <div class="article-container">
    <!-- 筛选区域 -->
    <el-card>
      <div slot="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <!-- 结果区域 -->
    <el-card></el-card>
  </div>
  <!-- 筛选区域 -->

  <!-- 结果区域 -->

</template>

<script>

export default {

}
</script>

<style scoped lang="less">
//  element-UI 提供的组件 解析完毕后在当前标签上会加上一个和组件的名称一致的class
.el-card {
  margin-bottom: 20px;
}
</style>
