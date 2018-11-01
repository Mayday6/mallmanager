<template>
<el-card class="box-card">
    <el-breadcrumb separator="/">
  <el-breadcrumb-item>首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
</el-breadcrumb>
<el-row class="searchArea">
    <el-col :span=24>
  <el-input placeholder="请输入内容" class="searchInput">
    <el-button slot="append" icon="el-icon-search"></el-button>
  </el-input>
   <el-button type="success" disabled>成功按钮</el-button>
   </el-col>
</el-row>
  <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        :type="index"
        label="日期"
        width="100">
      </el-table-column>
      <el-table-column
        label="姓名"
        width="100">
      </el-table-column>
       <el-table-column
        label="邮箱"
        width="100">
      </el-table-column>
       <el-table-column
        label="电话"
        width="100">
      </el-table-column>
       <el-table-column
        label="创建日期"
        width="100">
      </el-table-column>
       <el-table-column
        label="用户状态"
        width="120">
      </el-table-column>
       <el-table-column
        label="操作"
        width="180">
      </el-table-column>
    </el-table>
</el-card>

</template>

<script>
export default {
  data () {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ]
    }
  },
  created () {
    this.loadTableData()
  },
  methods: {
    async loadTableData () {
      // 各种功能都需要加入token
      const AUTH_TOKEN = sessionStorage.getItem('token')
      this.$http.defaults.feaders.common['Authorization'] = AUTH_TOKEN
      const res = await this.$http.get('users?pagenum=1&pagesize=10')
      console.log(res)
    }
  }
}
</script>

<style>
.box-card {
  height: 100%;
}
.searchArea {
  margin-top: 10px;
  margin-bottom: 10px;
}
.searchArea .searchInput {
  width: 350px;
}
</style>
