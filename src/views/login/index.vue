<template>
  <div class='login-container'>

    <el-form class="login-box">
      <img src="../../assets/images/logo_index.png"
           alt="">
      <!--验证表单  -->
      <el-form ref="loginForm"
               :status-icon="true"
               :model="loginForm"
               :rules="loginRules">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile"
                    placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <!-- prop 指定校验规则的字段 -->
          <el-input v-model="loginForm.code"
                    placeholder="请输入验证码"
                    style="width:240px"></el-input>
          <el-button style="float:right">发送验证码</el-button>

        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条框</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%"
                     type="primary"
                     @click="login()">登录</el-button>
        </el-form-item>
      </el-form>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    // 自定义校验手机号
    const checkMobile = (rule, value, callback) => {
      // 校验逻辑  把value拿出来进行手机号的格式校验
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不正确'))
      }
    }
    return {
      // 表单数据对象
      loginForm: {
        mobile: '',
        code: ''
      },
      // 表单验证规则对象
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }

        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位数字', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // 对整个表单进行校验
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 提交登录请求 接口使用文档  axios 是基于promise封装的post（） 返回一个promise对象
          this.$http
            .post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm)
            .then(res => {
              // res是  响应对象  包含 后台返回的数据 res.data
              // consol.log(res.data)  去做什么事情？？？
              // 1 跳转到首页
              // TODO 2 保存用户的信息  用来判断登录的状态
              window.sessionStorage.setItem('hm74-toutiao', JSON.stringify(res.data.data))
              this.$router.push('/')
            })
            .catch(() => {
              // 提示
              this.$message.error('手机号或验证码错误')
            })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url("../../assets/images/login_bg.jpg") no-repeat center / cover;
  .login-box {
    width: 400px;
    height: 340px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      display: block;
      width: 200px;
      margin: 10px auto;
    }
  }
}
</style>
