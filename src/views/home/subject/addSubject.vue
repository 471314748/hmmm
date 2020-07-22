<template>
  <div class="addSubject">
    <el-dialog :visible.sync='dialogFormVisible' width='600px'>
      <div slot="title" class="title">{{mode=='add'?"新增":"编辑"}}学科</div>
      <el-form :model="form" label-width='100px' :rules="rules" ref='form'>
        <el-form-item label='学科编号' prop='rid'>
          <el-input v-model="form.rid"></el-input>
        </el-form-item>
        <el-form-item label='学科名称'  prop='name'>
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label='学科简称'  prop='short_name'>
          <el-input v-model="form.short_name"></el-input>
        </el-form-item>
        <el-form-item label='学科简介'  prop='intro'>
          <el-input v-model="form.intro"></el-input>
        </el-form-item>
        <el-form-item label='学科介绍'  prop='remark'>
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogFormVisible=false">取消</el-button>
        <el-button type='primary' @click="loginClick">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addSubjectData, editSubjectData } from '@/api/subject'
export default {
  props:['mode'],
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
    },
    rules: {
      rid: [{ required: true, message: '请输入学科编号', trigger: 'chang' }],
      name: [{ required: true, message: '请输入学科名称', trigger: 'chang' }]
    }
  }
},
methods: {
  loginClick() {
    this.$refs.form.validate(result=>{
      if (result) {
        if(this.mode == 'add'){
          addSubjectData(this.form).then(()=>{
            // console.log(res)
            // 新增成功
            this.$message.success('新增成功')
            this.dialogFormVisible = false
            this.$emit("add")
            this.$parent.search()
          })
        } else {
          editSubjectData(this.form).then(()=>{
            // 编辑成功666
            this.$message.success('编辑成功')
            this.dialogFormVisible = false
            this.$parent.search()
          })
        }
        }
    })
  }
},
watch: {
    dialogFormVisible (newVal) {
      this.$refs.form.clearValidate()
      if (newVal === false) {
        // 清空表单
        this.$refs.form.resetFields()
      }
    },
    mode(){
      this.$nextTick(()=>{
        this.$refs.form.clearValidate()
      })
    }
  }
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