<template>
  <!-- 左侧导航 -->
  <div :style="leftNav">
    <el-menu :router="true" :default-active='activeIndex' class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" :unique-opened="true">
      <!-- 首页 -->
      <el-menu-item index="/index">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <!-- 是否展开 -->
      <el-submenu v-for="(value, index) in navLeft" :key="index" :index="(index+1).toString()">
        <template slot="title">
          <i :class="value.iconName"></i>
          <span slot="title">{{ value.meta.navName }}</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item-group v-for="(childNav, i) in value.children" :key="i">
          <el-menu-item :index="childNav.path">{{ childNav.meta.navName }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import router from '@/router/index.js'

export default {
  name: 'navleft',
  data () {
    return {
      // 是否折叠
      isCollapse: false,
      activeIndex: '/index',
      // 点击是否展开
      elicon: {
        'el-icon-s-fold': true,
        'el-icon-s-unfold': false
      },
      flag: true,
      // 样式
      leftNav: {
        width: '16.6667%',
        minHeight: '100%',
        background: '#324057',
        transition: 'width 600ms'
      }
    }
  },
  computed: {
    // 左侧菜单
    navLeft () {
      let leftNav = router.options.routes[0].children
      // console.log(leftNav)
      return leftNav.filter(value => {
        if (value.TheLeftNavigation) {
          return value
        }
      })
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
