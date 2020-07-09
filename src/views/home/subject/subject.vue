<template>
  <div class="subject">
    <!-- <h2>subject学科列表</h2> -->
    <el-card class="box-card">
      <el-form
        label-width='90px'
        :inline="true"
        :model='form'
      >
        <el-form-item label='学科编号'>
          <el-input
            class="sedWidth"
            v-model="form.rid"
          ></el-input>
        </el-form-item>
        <el-form-item label='学科名称'>
          <el-input
            class="sedWidth"
            v-model="form.name"
          ></el-input>
        </el-form-item>
        <el-form-item label='创建者'>
          <el-input
            class="sedWidth"
            v-model="form.username"
          ></el-input>
        </el-form-item>
        <el-form-item label='状态'>
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
          <el-button type='primary'>搜索</el-button>
          <el-button>清除</el-button>
          <el-button type='primary'>+新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-table :data="tableData">
        <el-table-column label="序号" width='50px'>
          <template slot-scope="scope">
            {{scope.$index+1}}
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
          <el-button>编辑</el-button>
          <el-button @click="setStatus(scope)">禁用</el-button>
          <el-button>删除</el-button>
        </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="[3, 20, 30, 40]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getsubjectData } from '@/api/subject.js'
export default {
  data () {
    return {
      pagination: {
        pageSize: 2,
        currentPage: 1,
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
    // 获取页码列表数据
    // var _params = {
    //   // 页码
    //   page: this.pagination.currentPage,
    //   // 页容量
    //   itmit: this.pagination.pageSize,
    //   ...this.form

    // }
    // // 获取搜索数据
    // getsubjectData(_params).then(res => {
    //   console.log('搜索数据', res)
    //   this.tableData = res.data.items
    //   this.pagination.total = res.data.pagination.total
    // })
    this.getData()
  },
  methods: {
    getData () {
      // 获取页码列表数据
      var _params = {
      // 页码
        page: this.pagination.currentPage,
        // 页容量
        itmit: this.pagination.pageSize,
        ...this.form
      }
      // 获取搜索数据
      getsubjectData(_params).then(res => {
        console.log('搜索数据', res)
        this.tableData = res.data.items
        this.pagination.total = res.data.pagination.total
      })
    },
    setStatus (scope) {
      console.log(scope)
    },
    // 页容量改变
    handleSizeChange (sizi) {
      // console.log('原容量', sizi)
      this.pagination.pageSize = sizi
      this.pagination.currentPage = 1
      // console.log(this.pagination.pageSize)
    },
    // 页码改变
    handleCurrentChange (page) {
      // console.log(page)
      this.pagination.currentPage = page
      // console.log(this.pagination.currentPage)
      this.getData()
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
