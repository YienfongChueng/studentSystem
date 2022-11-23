<template>
    <div id="login">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="title">xxx后台系统登陆</span>
            </div>
            <el-form :model="ruleForm" status-icon :rules="loginRules" ref="ruleForm" label-width="100px">
                <el-form-item label="用户名" prop="username">
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
import { nameRule, passwordRule} from '../utils/validate.js'
import { loginApi } from '../api/index.js'
import { setToken } from '../utils/auth.js'
export default {
    data() {
        return {
            ruleForm: {
                username: '',
                password: ''
            },
            loginRules: {
                username: [{validator:nameRule, trigger: 'blur' }],
                password: [{validator: passwordRule,trigger: 'blur'}]
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if(!valid)  {
                    this.$message.warn('请检查表单信息是否有误')
                    return false
                } 
                // 登陆
                loginApi(this.ruleForm).then(res => {
                    console.log(res)
                    if(res.status === 200) {
                         setToken('username', res.username)
                         setToken('token', res.token)
                         this.$message({message: res.message, type: 'success'})
                         this.$router.push('/student')
                    }
                })
            })
        }
    },

}
</script>
<style lang='less' scoped>
#login {
    width: 100%;
    height: 100vh;
    background: #7cb5ef;
    position: relative;
}
.el-card {
    text-align: center;
    width: 45%;
    margin: 0 auto;
    vertical-align: middle;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    .title {
        font-size: 30px;
        color: #666;
    }

}
</style>