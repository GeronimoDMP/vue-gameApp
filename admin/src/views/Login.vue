<template>
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent='login'>
        <el-form-item label="用户名">
            <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input type='password' v-model="model.password"></el-input>
        </el-form-item>
         <el-button type="primary" native-type="submit">登录</el-button>
      </el-form>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
            model:{}
        }
    },
    methods: {
        async login(){
            const res= await this.$http.post('login',this.model)
            // 存放服务器返回的token
            // localStorage.token=res.data
            localStorage.setItem('token',res.data)
            // 跳转到首页
            this.$router.push('/')
            // 弹窗
            this.$message({
            type: 'success',
            message:'登录成功'
        })
        }
    },
};
</script>

<style scoped>
 .login-card{
    width: 25rem; 
    margin: 5rem auto;
 }
</style>