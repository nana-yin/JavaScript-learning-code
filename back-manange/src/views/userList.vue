<template>
  <div class="userList">
    <h1>用户列表</h1>
    <template>
      <el-table
      :data="tableData.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column label="用户身份" prop="isManage"></el-table-column>
        <el-table-column label="用户姓名" prop="username"></el-table-column>
        <!-- 搜索 -->
        <el-table-column align="right">
          <template v-slot:header v-slot:scope>
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
export default {
  name: 'userList',
  data () {
    return {
      tableData: [],
      search: ''
    }
  },
  mounted () {
    let allUser = JSON.parse(localStorage.getItem('userInfo'))
    this.tableData = allUser
    // console.log(this.tableData)
  }
}
</script>

<style lang="stylus" scoped>
  .userList h1{
    text-align: center;
    margin: 20px auto;
  }
</style>
