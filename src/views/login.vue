<template>
<div class=" login-wrap">
    <el-form label-position="top" label-width="80px" class="login-form">
        <h2>用户登录</h2>
        <el-form-item label="用户名">
            <el-input v-model="formdata.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="formdata.password"></el-input>
        </el-form-item>
        <el-button type="primary" class="login-button" @click.prevent="handleLoginin()">登录</el-button>
    </el-form>
</div>
</template>

<script>
export default {
  // 数据保存
  data () {
    return {
      formdata: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async handleLoginin () {
      const res = await this.$http.post('login', this.formdata)
      const {meta} = res.data
      if (meta.status === 200) {
        // 获取token的值，将值保存在本地浏览器
        const token = res.data.data.token
        sessionStorage.setItem('token', token)
        // 登录成功以后，设置请求到首页
        this.$router.push('/')
        this.$message.success(meta.msg)
      } else {
        this.$message.warning(meta.msg)
      }
    }
    // handleLoginin () {
    //   this.$http.post('login', this.formdata)
    //     .then((res) => {
    //       const {meta} = res.data
    //       if (meta.status === 200) {
    //         this.$message.success(meta.msg)
    //       } else {
    //         this.$message.warning(meta.msg)
    //       }
    //     })
    // }
  }
}
</script>

<style>
.login-wrap {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-wrap .login-form {
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 5px;
}

.login-wrap .login-form .login-button {
  width: 100%;
}
</style>
