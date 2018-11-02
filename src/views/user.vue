<template>
<el-card class="box-card">
    <el-breadcrumb separator="/">
  <el-breadcrumb-item>首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
</el-breadcrumb>
<el-row class="searchArea">
    <el-col :span=24>
  <el-input placeholder="请输入内容" class="searchInput" v-model="searchVal">
    <el-button slot="append" icon="el-icon-search" @click.prevent="checkUser()"></el-button>
  </el-input>
   <el-button type="success" @click.prevent="showaddUser()">添加按钮</el-button>
   </el-col>
</el-row>
   <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAddUser">
  <el-form :model="formData">
    <el-form-item label="用户名" :label-width="formLabelWidth">
      <el-input v-model="formData.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth">
      <el-input v-model="formData.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" :label-width="formLabelWidth">
      <el-input v-model="formData.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="电话" :label-width="formLabelWidth">
      <el-input v-model="formData.mobile" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser()">确 定</el-button>
  </div>
</el-dialog>
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
          <!-- 设置change事件 -->
          <el-switch
            @change="changeSwitchMgstate(scope.row)"
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
          <el-button type="danger" size="min" plain icon="el-icon-delete" circle @click.prevent="showDeleBox(scope.row.id)"></el-button>
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
      total: 0,
      // 搜索查询
      searchVal: '',
      // 添加用户对话框的属性
      dialogFormVisibleAddUser: false,
      // 表单数据
      formData: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 对话框中的input的宽度
      formLabelWidth: '120px'
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
      const res = await this.$http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${this.searchVal}`)
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
        this.pagesize = 2
        this.pagenum = 1
        this.currentPage = 1
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
    },
    // 查询用户
    checkUser () {
      this.loadTableData()
    },
    // 改变用户的状态
    async changeSwitchMgstate (user) {
      // 发送请求,查看接口文档
      const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
      // 结构赋值
      const {meta: {status, msg}} = res.data
      // 请求成功，提示框
      if (status === 200) {
        this.$message.success(msg)
      }
    },
    // 显示删除提示框
    showDeleBox (userId) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`users/${userId}`)
        const {meta: {msg, status}} = res.data
        if (status === 200) {
          // 刷新数据
          this.loadTableData()
          this.$message.success(msg)
        }
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 显示添加的对话框
    showaddUser () {
      this.dialogFormVisibleAddUser = true
    },
    // 对话框添加用户
    async addUser () {
      // 调用这个方法的时候古娜彼对话框
      this.dialogFormVisibleAddUser = false
      // 发送请求
      const res = await this.$http.post('users', this.formData)
      const {meta: {status, msg}} = res.data
      console.log(status)
      this.loadTableData()
      this.$message.success(msg)
      // 清空表单
      for (const key in this.formData) {
        if (this.formData.hasOwnProperty(key)) {
          this.formData[key] = ''
        }
      }
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
