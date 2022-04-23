<template>
  <div class="login_container">
       <!-- 登录盒子  -->
    <div class="login_box">
        <!-- 头像 -->
        <div class="avatar_box">
              <img src="../assets/factory.png" alt="">  
        </div>
        <!-- 登录表单 -->
        <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef" label-width="0px" class="login_form">
            <!-- 用户名 -->
            <el-form-item prop="staff_code">
                <el-input v-model="loginForm.staff_code" prefix-icon="el-icon-user" ></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
                <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-key"></el-input>
            </el-form-item>
            <!-- 按钮 -->
            <el-form-item class="btns">
                <el-button type="primary" @click="login">登录</el-button>
                <el-button type="info" @click="resetLoginForm">重置</el-button>
            </el-form-item> 
        </el-form>
    </div> 
  </div>
</template>

<script>
export default {
  data(){
      return{
          // 表单请求数据
          loginForm:{
            staff_code:"",
            password:""
          },
          // 表单验证规则
          loginFormRules:{
             staff_code: [
            { required: true, message: '请输入工号', trigger: 'blur' },
            { min: 3, 
              max: 10, 
              message: '长度在 3 到 10 个字符', 
              trigger: 'blur' }
          ],
          password: [
              { required: true, message: '请输入密码', trigger: 'blur' },
              {
                  min: 3,
                  max: 15,
                  message: '密码长度在 3 到 15 个字符',
                  tigger: 'blur'
              }
          ]
          }
      }
  },
  // 添加行为
  methods: {
      // 添加表单重置方法
      resetLoginForm() {
          // this=>当前组件对像， 其中的属性$refs包含了设置的表单ref
          this.$refs.loginFormRef.resetFields()
      },
      login() {
          // 点击登录的时候先调用validate方法验证表单内容时候有误
          this.$refs.loginFormRef.validate(async valid => {
              console.log("dsss")
            //   console.log(this.loginFormRules);
              // 如果valid参数位true则验证通过
              if (!valid) {
                  return
              }
              // 发送请求进行登录
              const { data: res } = await this.$axios.post(this.api + '/login', this.loginForm)
              console.log(res)
              if (res.error !== null) {
                  return this.$message.error('登录失败：' + res.error.desc)
              }

              this.$message.success('登录成功')

              // 保存token
              window.sessionStorage.setItem('token', res.token)
             this.$router.push('/home')
          })
      }
  }
}
</script>
<style scoped="scoped">
    .login_container{
        height: 100%;
        background: rgb(43, 75, 107);
    }
    .login_box{
        width: 450px;
        height: 300px;
        background: #fff;
        border-radius: 3px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .avatar_box{
        height: 130px;
        width: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
    }
    .avatar_box img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        /* background-color: #eee; */
    }
    .login_form{
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }
    .btns {
        display: flex;
        justify-content: flex-end;
    }
</style>