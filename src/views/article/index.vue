<template>
  <div class="article-container">
    <!-- 筛选区域 -->
    <el-card>
      <div slot="header">
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb> -->
        <my-bread>内容管理</my-bread>
      </div>
      <!-- 筛选表单 -->
      <el-form :model="reqParams"
               size="small"
               label-width="80px">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqPatams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <el-select v-model="reqPatams.channel_id"
                     placeholder="所有频道">
            <el-option v-for="item in channelOptions"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间：">
          <div class="block">
            <el-date-picker v-model="datavalues"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 结果区域 -->
    <el-card>
      <my-test></my-test>
    </el-card>
  </div>

  <!-- 结果区域 -->

</template>

<script>
import MyBread from '../../../src/compnents/my-bread.vue'
// import MyTest from '../../../src/compnents/my-test.vue'
export default {
  //  注册组件
  components: { MyBread },
  data () {
    return {
      // 提交后台的筛选条件数据
      reqPatams: {
        //  后端接口文档中的数据时status  是属于reqParams的
        // 默认数据 ""  与 null区别
        //  如果是 null 该字段 是不会提交给后台的  这个是后端要求不传 ，空字符串 也是要传的
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      // 频道的选项数据
      channelOptions: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }],
      //  日期数据  为了绑定begin和end两项数据
      datavalues: []
    }
  }

}
</script>

<style scoped lang="less">
//  element-UI 提供的组件 解析完毕后在当前标签上会加上一个和组件的名称一致的class
.el-card {
  margin-bottom: 20px;
}
</style>
