
<template>
  <div class="article-container">
    <!-- <my-channel @input="fn"></my-channel> -->
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
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <!-- 为实现channel_id 改变时的数据跟新 -->
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="时间：">
          <div class="block">
            <el-date-picker value-format="yyyy-MM-dd"
                            @change="changeDate"
                            v-model="datavalues"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 结果区域 -->
    <el-card>
      <div slot="header">
        根据筛选条件共查到<b>{{total}}</b>条结果
      </div>
      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]"
                      style="width:100px; height:75px">
              <div slot="error">
                <img src="../../assets/images/error.gif"
                     width=100px;
                     height:75px
                     alt="">
              </div>
            </el-image>

          </template>
        </el-table-column>
        <el-table-column label="标题"
                         prop="title">
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status ===0"
                    type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status ===1">待审核</el-tag>
            <el-tag v-if="scope.row.status ===2"
                    type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status ===3"
                    type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status ===4"
                    type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间"
                         prop="pubdate">
        </el-table-column>
        <el-table-column label="操作"
                         width="120px">

          <template slot-scope="scope">
            <el-button @click="edit(scope.row.id)"
                       icon="el-icon-edit"
                       plain
                       type="primary"
                       circle></el-button>
            <el-button @click="del(scope.row.id)"
                       icon="el-icon-delete"
                       plain
                       type="danger"
                       circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="box">
        <el-pagination background
                       layout="prev, pager, next"
                       @current-change="pager "
                       :current-page="reqParams.page"
                       :page-size='reqParams.per_page'
                       :total="total">

        </el-pagination>
      </div>
    </el-card>
  </div>

  <!-- 结果区域 -->

</template>

<script>
// import MyBread from '../../../src/components/my-bread.vue'
// import MyTest from '../../../src/compnents/my-test.vue'
export default {
  //  注册组件
  // components: { MyBread },
  data () {
    return {
      // 提交后台的筛选条件数据
      reqParams: {
        // 默认第一页
        page: 1,
        per_page: 20,
        //  后端接口文档中的数据时status  是属于reqParams的
        // 默认数据 ""  与 null区别
        //  如果是 null 该字段 是不会提交给后台的  这个是后端要求不传 ，空字符串 也是要传的
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },

      //  日期数据  为了绑定begin和end两项数据
      datavalues: [],
      // 文章列表数据
      articles: [],
      // 总条数
      total: 0
    }
  },
  created () {
    this.getArticles()
  },
  methods: {
    // fn (data) {
    //   console.log('fn')
    //   console.log(data)
    // },
    //  编辑
    edit (id) {
      this.$router.push(`/publish?id=${id}`)
    },
    del (id) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`articles/${id}`)//  如果执行失败  下面的两行代码不会执行
        // 删除成功
        this.$message.success('删除成功')
        //  更新列表
        this.getArticles()
      }).catch(() => {

      })
    },
    //  分页
    pager (newPage) {
      //  提交当前页码给后台   才能获取对应 的数据
      this.reqParams.page = newPage
      this.getArticles()
    },
    // 选择时间处理函数
    changeDate (values) {
      this.reqParams.begin_pubdate = values[0]
      this.reqParams.end_pubdate = values[1]
    },
    //  筛选搜索
    search () {
      this.getArticles()
    },

    // 获取文件列表数据
    async getArticles () {
      // post 传参 post('url',{参数对象})
      //  get 传参  get('url?key=value1&....')
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      // 获取总条数
      this.total = data.total_count
    }
  }

}
</script>

<style scoped lang="less">
//  element-UI 提供的组件 解析完毕后在当前标签上会加上一个和组件的名称一致的class
.el-card {
  margin-bottom: 20px;
}
.box {
  text-align: center;
  margin-top: 20px;
}
</style>
