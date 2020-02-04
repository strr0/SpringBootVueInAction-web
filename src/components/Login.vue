<template>
    <el-form :rules="rules" ref="loginForm" class="login-container" :model="loginForm" v-loading="loading">
        <h3 class="login-title">登陆系统</h3>
        <el-form-item prop="username">
            <el-input type="text" v-model="loginForm.username" placeholder="用户名" />
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password" placeholder="密码" 
            @keydown.enter.native="submitMsg()" />
        </el-form-item>
        <el-checkbox class="login-remember" v-model="checked">记住密码</el-checkbox>
        <el-button type="primary" style="width: 100%;" v-on:click="submitMsg()">登陆</el-button>
    </el-form>
</template>

<script>
    export default {
        data() {
            return {
                rules: {
                    username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}]
                },
                loginForm: {
                    username: 'admin',
                    password: 'password'
                },
                checked: true,
                loading: false
            }
        },
        methods: {
            submitMsg() {
                this.$refs.loginForm.validate(valid => {
                    if(valid) {
                        this.loading = true;
                        this.postKeyValueRequest('/login', this.loginForm).then(resp => {
                            this.loading = false;
                            if(resp && resp.status == 200) {
                                this.$store.commit('login', resp.data.obj);
                                window.sessionStorage.setItem("user", JSON.stringify(resp.data.obj));
                                let path = this.$route.query.redirect;
                                this.$router.replace((path == '/' || path == undefined) ? '/home' : path);
                            }
                        })
                    }
                    else {
                        this.$message.error("请输入所有字段");
                        return false;
                    }
                });
            }
        }
    }
</script>

<style>
    .login-container{
        border-radius: 15px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #ffffff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .login-title{
        margin: 0 auto 40px auto;
        text-align: center;
        color: #505458;
    }
    .login-remember{
        margin: 0 0 35px 0;
        text-align: left;
    }
</style>