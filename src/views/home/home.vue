<template>
    <el-container class="layout">
      <el-header class="header">
        <div class="left">
        <i class="el-icon-s-fold setheight"></i>
        <img class="marginlr" src="@/assets/img/loginLogo.png" alt />
        <span class="title">黑马面面</span>
      </div>
      <div class="right">
        <img class="avatar" :src="userInfo.avatar" alt />
        <span class="name">{{userInfo.username}}，您好</span>
        <el-button type="primary" @click="exit">退出</el-button>
      </div>
      </el-header>
      <el-container>
        <el-aside
          width="200px"
          class="aside"
        >Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
</template>

<script>
import { getUserInfo, exitLogin } from '@/api/home.js'
import { removeToken } from '@/utils/token.js'
export default {
  data () {
    return {
      userInfo: ''
    }
  },
  created () {
    getUserInfo().then(res => {
      this.userInfo = res.data
      this.userInfo.avatar =
        process.env.VUE_APP_URL + '/' + this.userInfo.avatar
      window.console.log('用户信息', res)
    })
  },
  methods: {
    exit () {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        exitLogin().then(() => {
          removeToken()
          this.$router.push('/')
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .layout {
  height: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
    .left {
      .setheight {
        font-size: 20px;
        width: 24px;
        height: 20px;
      }
      .marginlr {
        margin-left: 10px;
        margin-right: 10px;
        width: 33px;
        height: 28px;
      }
      .title {
        font-size: 22px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(73, 161, 255, 1);
      }
    }
    .right {
      display: flex;
      align-items: center;
      .avatar {
        width: 43px;
        height: 43px;
      }
      .name {
        margin-left: 10px;
        margin-right: 10px;
      }
    }
  }
  .aside {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
  }
  .menuTransition:not(.el-menu--collapse) {
    // 初始宽度
    width: 160px;
  }
}
</style>
