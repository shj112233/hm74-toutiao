<template>
  <!-- 素材管理 -->
  <div class="container"
       v-loading="loading">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div style="margin-bottom:20px">
        <!-- 按钮式单选框 -->
        <el-radio-group size="small"
                        @change="search()"
                        v-model="reqParams.collect">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <!-- 绿色按钮 -->
        <el-button @click="dialogVisible = true"
                   size="small"
                   style="float:right"
                   type="success"> 添加素材</el-button>
      </div>
      <!-- 图片列表 -->
      <ul class="img-list">
        <li v-for="item in images"
            :key="item.id">
          <img :src="item.url"
               alt="">
          <div class="fot"
               v-if="!reqParams.collect">
            <span @click="toggleFav(item)"
                  class="el-icon-star-off"
                  :class="{red:item.is_collected}"></span>
            <span @click="delImage(item.id)"
                  class="el-icon-delete"></span>
          </div>
        </li>
      </ul>
      <el-pagination v-if="total>reqParams.per_page"
                     background
                     layout="prev, pager, next"
                     :total="total"
                     :page-size="reqParams.per_page"
                     :current-page="reqParams.page"
                     @current-change="pager">

      </el-pagination>
    </el-card>
    <!-- 对话框 -->
    <el-dialog title="添加素材"
               :visible.sync="dialogVisible"
               width="300px">
      <el-upload class="avatar-uploader"
                 action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
                 :headers="headers"
                 :show-file-list="false"
                 :on-success="handleSuccess"
                 name="image">
        <img v-if="imageUrl"
             :src="imageUrl"
             class="avatar">
        <i v-else
           class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">关 闭</el-button>

      </span>
    </el-dialog>
  </div>

</template>
<script>
export default {
  data () {
    return {
      // 参数对象 是提交给后台的参数
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10,
        total: 0
      },
      // 素材列表
      images: [],
      // 加载数据
      loading: false,
      // 总条数
      total: 0,
      // 添加素材相关数据
      dialogVisible: false,
      imageUrl: null,
      headers: {
        Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('hm74-toutiao')).token
      }
    }
  },
  created () {
    //  获取素材列表数据
    this.getImages()
  },
  methods: {
    // 删除图片 发请求
    delImage (id) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete('user/images/' + id)
        this.$message.success('删除成功')
        this.getImages()
      }).catch(() => {
        //  失败没有任何操作
      })
    },
    // 切换收藏 和取消收藏
    async toggleFav (item) {
      const { data: { data } } = await this.$http.put('user/images/' + item.id, {
        collect: !item.is_collected
      })
      // 成功
      this.$message.success('操作成功')
      // 把当前的图片的状态 改成操作后后台给的状态
      item.is_collected = data.collect
    },
    // 上传成功
    handleSuccess (res) {
      // 预览2秒钟  提示上传成功
      this.imageUrl = res.data.imageUrl
      this.$message.success('上传成功')
      window.setTimeout(() => {
        // 自动关闭对话框  更新列表数据
        this.dialogVisible = false
        this.getImages()
        //  再次打开对话框的时候  预览的是上传按钮  而不是之前的图片
        this.imageUrl = null
      }, 2000)
    },

    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },

    //  发送数据请求给后台
    async getImages () {
      this.loading = true
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      //  获取数据成功时  更新列表数据 需要在data中提前声明素材列表
      this.images = data.results
      // 设置总条数
      this.total = data.total_count
      // 成功后关闭
      this.loading = false
    },
    search () {
      //  重新拉去列表
      // 在拿到请求数据之前  应该把当前请求参数中的page 改成1
      this.reqParams.page = 1
      this.getImages()
    }
  }
}
</script>
<style scoped lang="less">
.img-list {
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    position: relative;
    width: 160px;
    height: 160px;
    border: 1px dashed #ddd;
    float: left;
    margin-right: 50px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .fot {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 30px;
      line-height: center;
      text-align: center;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      span {
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
