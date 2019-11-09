<template>
  <div class="exitRel">
    <div class="login_div">
        <h1>欢迎登录后台管理系统</h1>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="账号" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="身份">
            <el-radio label="管理员" v-model="ruleForm.isManage">管理员</el-radio>
            <el-radio label="普通用户" v-model="ruleForm.isManage">普通用户</el-radio>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'exitManage',
  data () {
    // 密码
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      userMessage: [{
        pass: '1',
        checkPass: '1',
        username: '1@qq.com',
        isManage: '管理员'
      }],
      ruleForm: {
        pass: '',
        checkPass: '',
        username: '',
        isManage: '普通用户'
      },
      // 验证
      rules: {
        pass: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    // 点击登录按钮
    submitForm (formName) {
      // 先将数据库中存储好的对象取出来,避免刷新后数据丢失
      let fetchthing = JSON.parse(localStorage.getItem('userInfo'))
      if (fetchthing !== null) {
        this.userMessage = fetchthing
      }
      this.$refs[formName].validate((valid) => {
        // valid表示是否成功登录,是一个boolen值
        if (valid) {
          console.log(this.userMessage)
          // 如果用户名和密码都相同并且存在于数据库,则进入主页
          // 如果用户名相同密码不同,则密码错误
          // 如果用户名不存在,则存到数据库中
          // 代码：
          // 数据库中有数据
          if (this.userMessage !== undefined) {
            // 是否存在该用户名
            let nameArr = this.userMessage.filter(item => item.username === this.ruleForm.username)
            // 相同的用户名,是否存在密码
            let userArr = this.userMessage.filter(item => item.username === this.ruleForm.username && item.pass === this.ruleForm.pass && item.isManage === this.ruleForm.isManage)
            // 用户名存在
            if (nameArr.length !== 0) {
              // 密码存在
              if (userArr.length !== 0) {
                // 跳转
                alert('用户名和密码都存在,跳转')
                localStorage.setItem('userInfo', JSON.stringify(this.userMessage))
                // 存储当前的用户
                localStorage.setItem('currentUser', JSON.stringify(this.ruleForm))
                this.$router.push('/index')
              } else {
                alert('密码错误')
                return false
              }
            } else {
              if (this.ruleForm.isManage === '管理员') {
                alert('该管理员不存在！')
                return false
              } else {
                alert('用户不存在!')
                return false
                // 所有的用户都存储到数据库
                // alert('用户名不存在则存到数据库')
                // this.userMessage.push(this.ruleForm)
                // localStorage.setItem('userInfo', JSON.stringify(this.userMessage))
                // // 存储当前的用户
                // localStorage.setItem('currentUser', JSON.stringify(this.ruleForm))
                // this.$router.push('/index')
              }
            }
          } else {
            // 数据库中没有数据
            if (this.ruleForm.isManage === '管理员') {
              alert('没有该管理员！')
              return false
            } else {
              // 存储到数据库
              alert('数据库中没有数据则存到数据库')
              this.userMessage.push(this.ruleForm)
              localStorage.setItem('userInfo', JSON.stringify(this.userMessage))
              // 存储当前的用户
              localStorage.setItem('currentUser', JSON.stringify(this.ruleForm))
              this.$router.push('/index')
            }
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="stylus" scoped>
    .exitRel{
        width: 100%;
        height: 100%;
        background: url("../assets/bg.jpg") no-repeat;
        border-top: 1px solid #fff;
    }
    .login_div{
        width: 60%;
        background: #48566A;
        margin: 60px auto;
        padding: 20px 30px 20px 0px;
    }
    .login_div h1{
        height: 60px;
        line-height: 60px;
        color: #fff;
        font-weight: 300;
        text-align: center;
    }
</style>
