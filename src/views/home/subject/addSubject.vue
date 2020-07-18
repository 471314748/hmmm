<template>
  <div class="addSubject">
    <el-dialog :visible.sync='dialogFormVisible' width='600px'>
      <div slot="title" class="title">新增学科</div>
      <el-form :model="form" label-width='100px'>
        <el-form-item label='学科编号'>
          <el-input v-model="form.rid"></el-input>
        </el-form-item>
        <el-form-item label='学科名称'>
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label='学科简称'>
          <el-input v-model="form.short_name"></el-input>
        </el-form-item>
        <el-form-item label='学科简介'>
          <el-input v-model="form.intro"></el-input>
        </el-form-item>
        <el-form-item label='学科介绍'>
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogFormVisible=false">取消</el-button>
        <el-button type='primary'>取消</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
export default {
data() {
  return {
    dialogFormVisible: false,
    form:{
      // 学科编号
      rid: '',
      // 学科名称
      name: '',
      // 学科简称
      short_name: '',
      // 学科简介
      intro: '',
      // 学科备注
      remark: ''
    }
  }
},
}
</script>

<style lang='less'>
.addSubject{
  .title{
    text-align: center;
    color: #fff;
    background-color: rgb(73, 161, 255);
    height: 53px;
    line-height: 53px;
  }
  .el-dialog__header{
    padding: 0;
  }
  .el-dialog__headerbtn .el-dialog__close{
    color: #ffffff;
  }
}
</style>