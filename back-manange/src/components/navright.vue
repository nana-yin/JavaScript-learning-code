<template>
    <div :style="rightContent">
    <!-- 顶部导航 -->
    <div class="topNav">
        <!-- 面包屑导航 -->
        <div class="topLeft">
        <el-button @click="extend" type="primary" size="mini"><i :class="elicon"></i></el-button>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item ref="currentName" :to="{ path: currentPath.path }">{{ currentName }}</el-breadcrumb-item>
        </el-breadcrumb>
        </div>
        <!-- 右侧导航 -->
        <div class="rightNav">
        <el-menu :router="true" :default-active="toolbaractiveIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-submenu v-for="(val,index) in navTop" :key="index" :index="(index+1).toString()" v-show='val.children'>
            <template slot="title">{{ val.meta.navName }}</template>
            <el-menu-item :index="key.path" v-for="(key,index) in val.children" :key="index" @click="exit(index)">{{key.meta.navName}}</el-menu-item>
            </el-submenu>
            <el-menu-item v-for="(v,index) in navTop" :key="index+'1'" :index="v.path" v-show='!v.children'>{{ v.meta.navName }}</el-menu-item>
        </el-menu>
        </div>
    </div>
    <!-- 其他页面的主要内容 -->
    <div class="otherDiv">
        <router-view></router-view>
    </div>
    </div>
</template>

<script>
import router from '@/router/index.js'

export default {
  name: 'navright',
  data () {
    return {
      // 是否折叠
      isCollapse: false,
      toolbaractiveIndex: 'systemList',
      // 点击是否展开
      elicon: {
        'el-icon-s-fold': true,
        'el-icon-s-unfold': false
      },
      flag: true,
      rightContent: {
        width: '83.3333%'
      },
      // 面包屑导航
      currentPath: {
        path: '',
        name: '',
        title: ''
      }
    }
  },
  // 监听点击的是哪些导航
  watch: {
    '$route' (to, from) {
      console.log(to)
      console.log(from)
      if (to.path !== from.path) {
        let currentPath = {
          path: to.path,
          name: to.name,
          title: to.meta.title
        }
        this.currentPath = currentPath
      }
    }
  },
  computed: {
    // 顶部菜单
    navTop () {
      let topNav = router.options.routes[0].children
      return topNav.filter(value => {
        if (value.TheTopNavigation) {
          // console.log(value.children)
          return value
        }
      })
    },
    // 面包屑导航
    currentName () {
      let title = this.currentPath.title ? this.currentPath.title : '后台管理系统'
      return title
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    // 是否展开
    extend () {
      if (this.flag) {
        this.rightContent = {
          width: '100%'
        }
      } else {
        this.rightContent = {
          width: '83.33333%'
        }
      }
      this.flag = !this.flag
      this.isCollapse = !this.isCollapse
      this.elicon = {
        'el-icon-s-fold': !this.elicon['el-icon-s-fold'],
        'el-icon-s-unfold': !this.elicon['el-icon-s-unfold']
      }
    },
    // 退出登录
    exit (id) {
      console.log(id)
      if (id === 2) {
        this.$router.push('/')
      }
    }
  }
}
</script>
