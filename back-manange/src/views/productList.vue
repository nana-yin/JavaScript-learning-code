<template>
  <div class="productList">
    <h1>商品列表</h1>
    <template>
    <el-table :data="goodsList" style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="商品价格" prop="price"></el-table-column>
      <el-table-column label="商品特点" prop="type"></el-table-column>
      <el-table-column label="商品添加者" prop="addUser"></el-table-column>
      <!-- 右侧 -->
      <el-table-column align="right">
        <template v-slot:header v-slot:scope>
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <!-- 编辑 -->
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗修改 -->
    <el-dialog title="修改商品" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="商品特点" prop="trait">
          <el-select v-model="form.trait" placeholder="请选择">
            <el-option label="新品" value="新品"></el-option>
            <el-option label="招牌" value="招牌"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品种类" prop="type">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="饮料" name="type"></el-checkbox>
            <el-checkbox label="水果" name="type"></el-checkbox>
            <el-checkbox label="特产" name="type"></el-checkbox>
            <el-checkbox label="日用品" name="type"></el-checkbox>
            <el-checkbox label="休闲食品" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="商品详情" prop="desc">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="goodsmodify('form')">确 定</el-button>
      </div>
    </el-dialog>
  </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      search: '',
      dialogFormVisible: false,
      form: {
        name: '',
        price: '',
        trait: '',
        type: [],
        desc: ''
      },
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
  // 获取本地存储的商品
  created () {
    let allgoods = JSON.parse(localStorage.getItem('goods'))
    this.tableData = allgoods
    // console.log(this.tableData)
  },
  // 搜索
  computed: {
    goodsList () {
      return this.tableData.filter(data => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase()))
    }
  },
  methods: {
    // 点击编辑
    handleEdit (index, row) {
      this.dialogFormVisible = true
      // console.log(row)
      // 将要修改的原始数据填到输入框
      this.form = Object.assign({}, row)
      localStorage.setItem('modifygoodsIndex', index + 1)
    },
    // 保存修改
    goodsmodify (formName) {
      this.dialogFormVisible = false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 获取当前操作好的数据,并且将这条数据与原始数据库中的数据合并
          let currentUser = JSON.parse(localStorage.getItem('currentUser'))
          if (currentUser.isManage === '管理员' || (currentUser.username === this.form.addUser)) {
            let id = localStorage.getItem('modifygoodsIndex')
            this.tableData[id - 1] = Object.assign(this.tableData[id - 1], this.form)
            console.log(this.tableData[id - 1])
            console.log(this.form)
            localStorage.setItem('goods', JSON.stringify(this.tableData))
            alert('修改成功!')
          } else {
            alert('您没有权限操作该数据哦~')
            return false
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 删除
    handleDelete (index, row) {
      this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'))
        // console.log(currentUser.username)
        // console.log(row)
        if (currentUser.isManage === '管理员' || (currentUser.username === row.addUser)) {
          this.tableData.splice(index, 1)
          localStorage.setItem('goods', JSON.stringify(this.tableData))
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        } else {
          alert('您没有权限操作该商品哦~')
          return false
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .productList h1{
    text-align: center;
    margin: 20px auto;
  }
</style>
