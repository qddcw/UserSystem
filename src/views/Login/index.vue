<template>
    <div class="login-container">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules" class="login-form">
            <p class='login-title'>XXX用户管理系统</p>
            <el-form-item label="用户名:" prop="username">
                <el-input v-model="form.username" clearable @keyup.native.13="onSubmit"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="password">
                <el-input v-model="form.password" type="password" clearable @keyup.native.13="onSubmit"></el-input>
            </el-form-item>

            <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form>
    </div>
</template>
<script>
    import {
        login,
        getUserInfo
    } from '@/api/login'
    export default {
        data() {
            return {
                form: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [{
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }],
                }
            }
        },
        methods: {
            onSubmit() {
                this.$refs["form"].validate(valid => {
                    if (valid) {
                        login(this.form.username, this.form.password).then(res => {
                            const resp = res.data;
                            if (resp.flag) {
                                this.success(resp.message)
                                window.localStorage.setItem("token", JSON.stringify(resp.data.token));
                                
                                getUserInfo(resp.data.token).then(res_info => {
                                    if (res_info.data.flag) {
                                        this.success(res_info.data.message)
                                        window.localStorage.setItem("userinfo", JSON.stringify(
                                            res_info.data.data));
                                        this.$router.push('/');
                                    } else {
                                        this.warn(res_info.data.message)
                                    }

                                })
                            } else {
                                this.warn(resp.message)
                            }

                        })
                    } else {
                        return;
                    }
                })
            }
        }
    }
</script>


<style scoped>
    .login-form {
        width: 19vw;
        /* 上下间隙 160px, 左右自动居中 */
        background-color: rgb(255, 255, 255, 0.8);
        padding: 40px;
        border-radius: 20px;
        position: absolute;
        left: 38%;
        top: 30%;
    }

    .login-container {
        width: 100%;
        height: 100vh;
        background: url('../../assets/login.jpg');
        background-size: cover;
        position: relative;
    }

    p.login-title {
        text-align: center;
        font-size: 2rem;
        margin: 20px;
    }

    button {
        width: 100%
    }

    div.el-form-item {
        margin-bottom: 30px;
    }
</style>