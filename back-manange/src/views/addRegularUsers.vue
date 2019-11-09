<template>
  <div class="addRegularUsers">
    <h1>添加普通用户</h1>
    <el-form
      :model="addReguser"
      status-icon
      :rules="rules"
      ref="addReguser"
      label-width="100px"
      class="demo-addReguser"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="addReguser.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="addReguser.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="addReguser.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('addReguser')">添加</el-button>
        <el-button @click="resetForm('addReguser')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.addReguser.checkPass !== '') {
          this.$refs.addReguser.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.addReguser.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      addReguser: {
        pass: '',
        checkPass: '',
        username: '',
        isManage: '普通用户'
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        username: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 当前用户是普通用户时,不允许修改
          // 当前用户是管理员时,查找添加的用户名是否存在,存在则报错
          // 如果不存在则添加到数据库
          // 先将数据库中存储好的对象取出来,避免刷新后数据丢失
          // 代码：
          // 将数据库中的数据取出来
          let localUser = JSON.parse(localStorage.getItem('userInfo'))
          let nowUser = JSON.parse(localStorage.getItem('currentUser'))
          if (nowUser.isManage !== '普通用户') {
            let addData = localUser.filter(item => item.username === this.addReguser.username)
            console.log(addData)
            // 如果用户名存在
            if (addData.length === 1) {
              alert('该用户已存在！')
              return false
            } else {
              alert('用户不存在,管理员将其添加到数据库！')
              localUser.push(this.addReguser)
              localStorage.setItem('userInfo', JSON.stringify(localUser))
            }
          } else {
            alert('普通用户不允许修改数据哦~')
            return false
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
