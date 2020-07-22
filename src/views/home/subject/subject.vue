<template>
  <div class="subject">
    <!-- <h2>subject学科列表</h2> -->
    <el-card class="box-card">
      <el-form
        label-width='90px'
        :inline="true"
        :model='form'
        ref='form'
      >
        <el-form-item label='学科编号' prop='rid'>
          <el-input
            class="sedWidth"
            v-model="form.rid"
          ></el-input>
        </el-form-item>
        <el-form-item label='学科名称' prop='name'>
          <el-input
            class="sedWidth"
            v-model="form.name"
          ></el-input>
        </el-form-item>
        <el-form-item label='创建者' prop='username'>
          <el-input
            class="sedWidth"
            v-model="form.username"
          ></el-input>
        </el-form-item>
        <el-form-item label='状态' prop='status'>
          <el-select
            placeholder="请选择状态"
            v-model="form.status"
            class="sedWidth"
          >
            <el-option
              label='启用'
              value='1'
            ></el-option>
            <el-option
              label='禁用'
              value='0'
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type='primary' @click="search">搜索</el-button>
          <el-button @click="eliminate">清除</el-button>
          <el-button type='primary' @click="add">+新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-table :data="tableData">
        <el-table-column label="序号" width='50px'>
          <template slot-scope="scope">
            {{(pagination.currentPage-1)*pagination.pageSize+scope.$index+1}}
          </template>
        </el-table-column>
        <el-table-column
          prop="rid"
          label="学科编号"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="学科名称"
        >
        </el-table-column>
        <el-table-column
          prop="short_name"
          label="简称"
        >
        </el-table-column>
        <el-table-column
          prop="username"
          label="创建者"
        >
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建日期"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width='100px'
        >
        <template slot-scope="scope">
          {{scope.row.status==1?'启用':'禁用'}}
        </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width='270px'
        >
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)">编辑</el-button>
          <el-button @click="setStatus(scope.row.id)">{{scope.row.status==0?'启用':'禁用'}}</el-button>
          <el-button @click="del(scope.row.id)">删除</el-button>
        </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        ></el-pagination>
      </div>
    </el-card>
    <addSubject ref='addSubject' :mode='mode'></addSubject>
  </div>
</template>

<script>
import addSubject from './addSubject'
import { getSubjectData, setSubjectStatus, delSubjectData } from '@/api/subject.js'
export default {
  components:{
    addSubject
  },
  data () {
    return {
      mode: 'add',
      pagination: {
        //每页条数
        pageSize: 10,
        //当前页
        currentPage: 1,
        //总条数
        total: 40
      },
      form: {
        rid: '',
        name: '',
        username: '',
        status: ''
      },
      tableData: []
    }
  },
  created () {
    // 搜索
    this.getData()
  },
  methods: {
    getData () {
      // 获取页码列表数据
      var _params = {
      // 页码
        page: this.pagination.currentPage,
        // 页容量
        limit: this.pagination.pageSize,
        ...this.form
      }
      // 获取搜索数据
      getSubjectData(_params).then(res => {
        // console.log('搜索数据', res)
        this.tableData = res.data.items
        this.pagination.total = res.data.pagination.total
      })
    },
    setStatus (id) {
      // console.log(id)
      setSubjectStatus({id}).then(() => {
        // console.log(res)
        this.$message.success('设置状态成功')
        this.search()
      })
    },
    // 页容量改变
    handleSizeChange (sizi) {
      // console.log('原容量', sizi)
      this.pagination.pageSize = sizi
      this.pagination.currentPage = 1
      this.getData()
      // console.log(this.pagination.pageSize)
    },
    // 页码改变
    handleCurrentChange (page) {
      // console.log(page)
      this.pagination.currentPage = page
      // console.log(this.pagination.currentPage)
      this.getData()
    },
    // 搜索功能
    search () {
      // 页码回1
      this.pagination.currentPage = 1
      this.getData()
    },
    // 清空表单
    eliminate () {
      this.$refs.form.resetFields()
      this.getData()
    },
    // 删除数据
    del (id) {
      this.$confirm('你确定要删除此条数据吗?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delSubjectData({id}).then(() => {
          this.$message.success('删除成功!')
          this.search()
        })
      })
    },
    // 修改子的值，使得模态框显示
    add(){
      this.mode = 'add'
      this.$refs.addSubject.form = {
      rid: '',
      name: '',
      short_name: '',
      intro: '',
      remark: ''
      }
      this.$refs.addSubject.dialogFormVisible = true
    },
    edit(row){
      this.mode = 'edit'
      this.$refs.addSubject.form = JSON.parse(JSON.stringify(row))
      this.$refs.addSubject.dialogFormVisible = true
    }
  }
}
</script>

<style lang='less'>
.subject {
  .sedWidth {
    width: 120px;
  }
  .pagination{
    text-align: center;
    margin-top: 25px;
  }
}
</style>
