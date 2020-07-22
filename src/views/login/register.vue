<template>
  <div class="register">
    <el-dialog
      :visible.sync='dialogFormVisible'
      class="register"
      width="600px"
      :show-close="false"
    >
      <div
        slot="title"
        class="title"
      >用户注册</div>
      <el-form
        :model='form'
        label-width='100px'
        ref='form'
        :rules='rules'
      >
        <el-form-item
          label="头像"
          prop='avatar'
        >
          <el-upload
            class="avatar-uploader"
            name="image"
            :action="baseUrl+'/uploads'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="imageUrl"
              :src="imageUrl"
              class="avatar"
            >
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
            ></i>
          </el-upload>
        </el-form-item>
        <!-- 昵称 -->
        <el-form-item
          label='昵称'
          prop='username'
        >
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item
          label='邮箱'
          prop='email'
        >
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <!-- 电话 -->
        <el-form-item
          label='电话'
          prop='phone'
        >
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item
          label='密码'
          prop='password'
        >
          <el-input
            :show-password='true'
            v-model="form.password"
          ></el-input>
        </el-form-item>
        <!-- 图形码 -->
        <el-form-item
          label='图形码'
          prop='code'
        >
          <el-row>
            <el-col :span='16'>
              <el-input v-model="form.code"></el-input>
            </el-col>
            <el-col
              :span='7'
              :offset='1'
            >
              <img
                class="code"
                :src="codeUrl"
                @click="changeCodeUrl"
                alt
              />
              <!-- <el-button>验证码</el-button> -->
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item label='验证码'>
          <el-row>
            <el-col :span='16'>
              <el-input v-model="form.rcode"></el-input>
            </el-col>
            <el-col
              :span='7'
              :offset='1'
            >
              <el-button
                @click="getRecode"
                :disabled='totalTime!=60'
              >获取验证码<span v-if="totalTime!=60">{{totalTime}}</span></el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="center"
      >
        <el-button
          class="btn"
          @click="dialogFormVisible=false"
        >取消</el-button>
        <el-button
          type='primary'
          @click="subitClick"
        >确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import axios from 'axios'
import { register, getPhoneCode } from '../../api/register'
export default {
  data() {
    return {
      // 判断表当要清空不
      dialogFormVisible: false,
      // 倒计时时间
      totalTime: 60,
      // 控制弹窗是否显示
      dialogVisible: false,
      // 图形验证码
      codeUrl: process.env.VUE_APP_URL + '/captcha?type=sendsms',
      // 表单数据
      form: {
        avatar: '',
        username: '',
        password: '',
        email: '',
        phone: '13426543201',
        code: '',
        rcode: ''
      },
      // 验证
      rules: {
        avatar: [{ required: true, message: '请上传头像', trigger: 'change' }],
        username: [{ required: true, message: '请输入昵称', trigger: 'change' }],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              const _reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
              if (_reg.test(value)) {
                callback()
              } else {
                callback(new Error('请输入正确的邮箱地址'))
              }
            }
          }],
        phone: [
          { required: true, message: '请输入邮箱', trigger: 'change' },
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
          { required: true, message: '请输入密码', trigger: 'change' },
          { min: 6, max: 12, message: '长度在 6 到 12 位长度密码', trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '长度在 4 位验证码', trigger: 'change' }
        ]
      },
      // 基地址
      baseUrl: process.env.VUE_APP_URL,
      // 图片地址
      imageUrl: ''
    }
  },
  // 监听器
  watch: {
    dialogFormVisible(newVal) {
      if (newVal === false) {
        // 清空表单
        this.$refs.form.resetFields()
        // 将图片置空
        this.imageUrl = ''
      }
    }
  },
  methods: {
    andleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    // 上传前处理
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/png/gif 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
      }
      return isJPG && isLt2M
    },
    // 上传成功处理
    handleAvatarSuccess(res) {
      console.log('图片上传信息', res)
      this.imageUrl = this.baseUrl + '/' + res.data.file_path
      this.form.avatar = res.data.file_path
      this.$refs.form.validateField('avatar')
    },
    // 确认验证表单
    subitClick() {
      this.$refs.form.validate(result => {
        // console.log(result)
        if (result) {
          register(this.form).then(() => {
            // console.log('注册信息', res)
            // if (res.data.code === 200) {
            this.$message.success('注册成功')
            this.dialogFormVisible = false
            // }
          })
        }
      })
    },
    // 刷新图形码
    changeCodeUrl() {
      this.codeUrl = process.env.VUE_APP_URL + '/captcha?type=sendsms&t=' + Date.now()
    },
    // 获取验证码
    getRecode() {
      let _pass = true
      this.$refs.form.validateField(['code', 'phone'], error => {
        if (error !== '') {
          _pass = false
        }
      })
      if (_pass === false) {
      } else {
        this.totalTime--
        const _interval = setInterval(() => {
          this.totalTime--
          if (this.totalTime <= 0) {
            clearInterval(_interval)
            this.totalTime = 60
          }
        }, 1000)
        // 调用接口获取验证码
        getPhoneCode({
          code: this.form.code,
          phone: this.form.phone
        }).then(res => {
          this.$message.success(res.data.captcha + '')
        })
      }
    }
  }
}
</script>

<style lang='less' scoped>
.register {
  .title {
    // width:600px;
    height: 53px;
    background: rgba(3, 192, 249, 1);
    color: #fff;
    text-align: center;
    line-height: 53px;
  }
  .center {
    text-align: center;
  }
  // 图片上传
  .avatar-uploader {
    width: 178px;
    margin: 0 auto;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: 1px dashed #ccc;
  }
}
</style>
<style lang='less'>
.register {
  .el-dialog__header {
    padding: 0;
  }
  // 图片上传
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: 1px dashed #ccc;
  }
  .code {
    width: 100%;
    height: 40px;
    border: 1px solid #ccc;
  }
}
</style>
