<template>
  <div class="addGoods">
    <h1>添加商品</h1>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input v-model="ruleForm.price"></el-input>
      </el-form-item>
      <el-form-item label="商品特点" prop="trait">
        <el-select v-model="ruleForm.trait" placeholder="请选择">
          <el-option label="新品" value="新品"></el-option>
          <el-option label="招牌" value="招牌"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品种类" prop="type">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="饮料" name="type"></el-checkbox>
          <el-checkbox label="水果" name="type"></el-checkbox>
          <el-checkbox label="特产" name="type"></el-checkbox>
          <el-checkbox label="日用品" name="type"></el-checkbox>
          <el-checkbox label="休闲食品" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="商品详情" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'addGoods',
  data () {
    return {
      ruleForm: {
        addUser: JSON.parse(localStorage.getItem('currentUser')).username,
        name: '',
        price: '',
        // 商品特点
        trait: '',
        // 商品种类
        type: [],
        // 商品详情
        desc: ''
      },
      goods: [],
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        trait: [
          { required: true, message: '请选择商品特点', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个商品种类', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写商品详情', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 获取数据库中的数据,查看数据库中是否有该数据
          let goodsStorage = JSON.parse(localStorage.getItem('goods'))
          console.log(goodsStorage)
          if (goodsStorage !== null) {
            this.goods = goodsStorage
          }
          this.goods.push(this.ruleForm)
          localStorage.setItem('goods', JSON.stringify(this.goods))
          console.log(this.goods)
          alert('添加成功!')
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
  .addGoods h1{
    text-align: center;
    margin: 20px auto;
  }
</style>
