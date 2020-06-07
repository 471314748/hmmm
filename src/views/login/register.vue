<template>
  <div class="register">
    <el-dialog
      :visible.sync='dialogVisible'
      class="register"
      width="600px"
      :show-close="false"
    >
    <div slot="title" class="title">用户注册</div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false
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
  .el-dialog__header {
    padding: 0;
  }
}
</style>
