<template>
  <div class="login">
    <div class="left">
      <div class="title">
        <img
          src="@/assets/img/titele@2x.png"
          alt=""
        >
        <span class="titleName">黑马面面</span>
        <span class="titleLine">|</span>
        <span class="titleName">用户登录</span>
      </div>
      <!-- 具体表单  -->
      <el-form
        ref='form'
        :model='form'
        :rules='rules'
      >
        <el-form-item prop='phone'>
          <el-input
            placeholder='请输入用户名'
            prefix-icon='el-icon-user'
            v-model="form.phone"
          ></el-input>
        </el-form-item>
        <el-form-item prop='password'>
          <el-input
            placeholder='请输入密码'
            prefix-icon='el-icon-goods'
            :show-password='true'
            v-model="form.password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.code" prefix-icon="el-icon-key" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="8">
              <img :src="code" @click="codeClick" class="key" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 条款 -->
        <el-form-item prop="isCheck">
          <el-checkbox v-model="form.isCheck">
            我已经阅读并且同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button type='primary' class="btn" @click="loginClick">登录</el-button>
          <br />
          <el-button type='primary' class="btn" @click="registerClick">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="rigth">
      <img src='@/assets/img/login_banner_ele@2x.png' />
    </div>
    <!-- 注册组件 -->
    <register ref="register"></register>
  </div>
</template>

<script>
// import router from '../../router'
import register from './register'
import { toLogin } from '../../api/login'
import { setToken, getToken } from '@/utils/token.js'
export default {
  components: {
    register
  },
  data () {
    return {
      code: process.env.VUE_APP_URL + '/captcha?type=login',
      form: {
        phone: '18511111111',
        password: '12345678',
        code: '',
        isCheck: ''
        // dialogVisible: false
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              const _reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
              if (_reg.test(value)) {
                callback()
              } else {
                callback(new Error('请输入正确的手机号码'))
              }
            }
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 位长度密码', trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '长度在 4 位验证码', trigger: 'change' }
        ],
        isCheck: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value === true) {
                callback()
              } else {
                callback(new Error('请勾选协议'))
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    loginClick () {
      this.$refs.form.validate(result => {
        // console.log(result)
        // this.$message.success(result + '')
        // console.log(process.env.VUE_APP_URL)
        // this.$message.success(process.env.VUE_APP_URL)
        // 登录
        if (result === true) {
          toLogin(this.form).then(res => {
            this.$message.success('登录成功')
            console.log('登录信息：', res)
            setToken(res.data.token)
            this.$router.push('/home')
          })
        }
      })
    },
    registerClick () {
      this.$refs.register.dialogFormVisible = true
    },
    codeClick () {
      this.code = process.env.VUE_APP_URL + '/captcha?type=login&t=' + Date.now()
    }
  },
  created () {
    if (getToken()) {
      this.$router.push('/home')
    }
  }
}
</script>

<style lang='less' scoped>
.login {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  // height: 788px;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  .rigth {
    img {
    width: 630px;
    height: 435px;
    }
  }
}
.left {
  width: 478px;
  height: 550px;
  background: rgba(245, 245, 245, 1);
  padding: 43px;
  // img {
  //   width: 22px;
  //   height: 17px;
  // }
  .title {
    margin-bottom: 20px;
    .titleName {
      font-size: 24px;
      font-weight: 400;
      color: rgba(12, 12, 12, 1);
      margin-right: 15px;
      margin-left: 15px;
    }
    .titleLine {
      font-size: 24px;
      color: #ccc;
    }
  }
  .key {
      width: 100%;
      height: 40px;
    }
  .btn{
    width: 100%;
  }
  .btn:nth-child(1){
    margin-bottom: 26px;
  }
}
</style>
