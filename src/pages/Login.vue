<template>
    <div class="page-login">
        <div class="login-bg-img"><div class="cover"></div></div>
        <div class="login-box">
            <el-form label-position="right" label-width="4em" :model="form" ref="form">
                <el-form-item label="账号" prop="account" :rules="rules.input" :required="false">
                    <el-input v-model="form.account" placeholder="请输入账号名称"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" :rules="rules.input" :required="false">
                    <el-input v-model="form.password" placeholder="请输入密码" show-password @keyup.native.enter="toLogin"></el-input>
                </el-form-item>
                <el-button type="primary" class="w-100" @click="toLogin">登录</el-button>
            </el-form>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { Form,FormItem,Button,Input } from 'element-ui';
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Button);
Vue.use(Input);
export default {
    name: 'PageLogin',
    components: {},
    data() {   
        var numberJudge = (rule, value, callback) => {
            let message = "请输入";
            if (!value && value !== 0){          
              callback(new Error(message));
              return;
            }else{
                if(value < 0){
                  callback(new Error("请输入正数"));
                  return;
                }
            }
            callback();
        };
        var rateJudge = (rule, value, callback) => {
            let message = "请输入";
            if (!value && value !== 0){
              callback(new Error(message));
              return;
            }else{
                if(!Number(value)  && Number(value) !== 0){
                  callback(new Error("请输入数字"));
                  return;                   
                }else if(value < 0){
                  callback(new Error("请输入正数"));
                  return;              
                }else if(value > 100){
                  callback(new Error("最大比例100%"));
                  return;
                }
            }
            callback();
        };
        var inputMessage = (rule, value, callback) => {
            let message = "请输入";
            if (!value && value !== 0){   
              if(rule.field.indexOf("account") > -1){
                message = '账号不能为空';
              }else if(rule.field.indexOf("password") > -1){
                message = '密码不能为空';
              }
              callback(new Error(message));
              return;
            }
            callback();
        };
        var arrayMessage = (rule, value, callback) => {
            let message = "请选择";
            if(typeof value != "boolean"){
              if (!value || value.length == 0){
                callback(new Error(message));
                return;
              }
            }
            callback();
        };
        return {
            ajaxBool:true,
            form:{
                account:'',
                password:''
            },
            rules: {
                select: [
                  { required: true, message: '请选择', trigger: 'change' },
                ],
                input:[
                  { required: false, validator:inputMessage,  trigger: 'blur'}
                ],
                autoInput:[
                  { required: true, validator:inputMessage,  trigger: 'change'}
                ],
                number:[
                  { required: true, validator:numberJudge, trigger: 'blur' }
                ],
                rateNumber:[
                  { required: true, validator:rateJudge, trigger: 'blur' }
                ],
                arraySelect:[
                  { type: 'array', required: true,validator:arrayMessage, trigger: 'change' }
                ],
            }
        }
    },
    watch: {

    },
    computed: {

    },
    filters: {

    },
    methods: {
        loginSubmit(){            
            let _this = this;
            let postUrl = '';
            let postData = {
                account:_this.form.account,
                password:_this.form.password
            }
            if(!_this.ajaxBool){
                return;
            }
            _this.ajaxBool = false;
            this.$http.ajax("post",postUrl,postData,function(data) {
                _this.ajaxBool = true;
                console.log(data);
            },function(){
                _this.ajaxBool = true;
            },true);
        },
        toLogin(){
            let _this = this;
            this.$refs.form.validate((valid) => {
                if(valid){
                    _this.loginSubmit();
                }
            });
        },

        toLogin1(){
            console.log(1)
        },
    },
    mounted() {

    }
};
</script>
<style lang="less">
.page-login {
    position:relative;
    width:100vw;
    height:100vh;
    .login-box{
        position: absolute;
        right: 20vw;top: 40vh;
        z-index:2;
        margin:0 auto;
        width:320px;
        padding:40px 30px;
        background:#FFF;
        border-radius:4px;
        box-shadow: 0 0 4px rgba(0,0,0,0.1);
    }
    .login-bg-img{
        position: absolute;
        left: 0;top: 0;
        z-index:-1;
        width: 100vw;height:100vh;
        background: url("../assets/images/a3.jpeg") 0 0 no-repeat;
        background-size: cover;
        .cover{
            position: absolute;
            left: 0;top: 0;
            width: 100vw;height:100vh;
            z-index: 1;
            background: rgba(0,0,0,0.35);
        }
    }
}
</style>