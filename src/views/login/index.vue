<template>
  <div class='login-container'>

    <el-card class="login-box">
      <img src="../../assets/images/logo_index.png"
           alt="">
      <!--验证表单  ！-->
      <el-form ref="loginForm"
               :status-icon="true"
               :model="loginForm"
               :rules="loginRules">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile"
                    placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.mobile"
                    placeholder="请输入密码"
                    style="width:240px"></el-input>
          <el-button style="float:right">发送验证码</el-button>

        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条框</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%"
                     type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 表单数据对象
      loginForm: {
        mobile: '',
        code: ''
      },
      // 表单验证规则对象
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }

        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
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
