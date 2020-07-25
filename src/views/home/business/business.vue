<template>
  <div class="business">
    <el-card>
      <el-form :inline='true' :model='form'>
        <el-form-item label='企业标题'>
          <el-input class="sedWidth" v-model="form.rid"></el-input>
        </el-form-item>
        <el-form-item label='企业名称'>
          <el-input class="sedWidth" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label='创建者'>
          <el-input class="sedWidth" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label='状态'>
          <el-select placeholder="请选择状态" v-model="form.status">
            <el-option label='启用' value='1'></el-option>
            <el-option label='禁用' value='0'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item labek='企业标题'>
          <el-button type='primary'>搜索</el-button>
          <el-button>清除</el-button>
          <el-button type='primary'>+新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        rid: '',
        name: '',
        username: '',
        status: ''
      }
    }
  },

}
</script>

<style lang='less' scope>
.business{
  .sedWidth {
    width: 120px;
  }
}
</style>
