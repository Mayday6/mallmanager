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
      v-loading="loading"
      :data="list"
      style="width: 100%">
      <el-table-column
        type="index"
        label="#"
        width="80">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="100">
      </el-table-column>
       <el-table-column
        prop="email"
        label="邮箱"
        width="150">
      </el-table-column>
       <el-table-column
        prop="mobile"
        label="电话"
        width="100">
      </el-table-column>
       <el-table-column
        label="创建日期"
        width="180">
        <!-- 格式化日期事件 -->
        <template slot-scope="scope">
          {{scope.row.create_time | fmtDate}}
        </template>
      </el-table-column>
       <el-table-column
        label="用户状态"
        width="120">
        <!-- 单元格的内容不是字符串的时候，
        比如说其他的组件开关需要在组件外加容器template
        slot-scope传值，
        自带的固定属性
        是接收值的意思后面的scope就是table中的list
         -->
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
       <el-table-column
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="min" plain icon="el-icon-edit" circle></el-button>
          <el-button type="danger" size="min" plain icon="el-icon-delete" circle></el-button>
          <el-button type="success" size="min" plain icon="el-icon-check" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</el-card>

</template>

<script>
export default {
  data () {
    return {
      list: [],
      loading: true,
      // 表格加载的动画
      currentPage: 1,
      pagenum: 1,
      pagesize: 2,
      total: 0
    }
  },
  created () {
    this.loadTableData()
  },
  methods: {
    async loadTableData () {
      this.loading = true
      // 各种功能都需要加入token
      const AUTH_TOKEN = sessionStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      const res = await this.$http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      console.log(res)
      // 根据返回的数据获取总的条数
      this.total = res.data.data.total
      // 将返回的数据结构赋值
      const {meta: {msg, status}, data: {users}} = res.data
      console.log(msg)
      // 判断数据
      if (status === 200) {
        this.loading = false
        this.list = users
        // console.log(list)
      }
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.loadTableData()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.loadTableData()
      console.log(`当前页: ${val}`)
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
