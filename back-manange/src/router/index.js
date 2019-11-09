import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/index.vue'),
    meta: {
      title: '欢迎语'
    },
    // 顶部导航
    children: [
      // 首页
      {
        path: '',
        name: 'mainPage',
        component: () => import('../views/mainPage.vue'),
        meta: {
          title: '后台管理系统'
        }
      },
      {
        path: '/personal',
        name: 'personal',
        component: () => import('../views/personal.vue'),
        meta: {
          // 用来显示面包屑导航
          title: '个人用户中心',
          // 用来显示左导航
          navName: '个人用户中心'
        },
        TheLeftNavigation: false,
        TheTopNavigation: true,
        children: [
          {
            path: '/personalData',
            name: 'personalData',
            component: () => import('../views/personalData.vue'),
            meta: {
              title: '个人资料',
              navName: '个人资料'
            },
            TheLeftNavigation: false,
            TheTopNavigation: true
          },
          {
            path: '/modifypwd',
            name: 'modifypwd',
            component: () => import('../views/modifypwd.vue'),
            meta: {
              title: '修改密码',
              navName: '修改密码'
            },
            TheLeftNavigation: false,
            TheTopNavigation: true
          },
          {
            path: '/exitManage',
            name: 'exitManage',
            component: () => import('../views/exitManage.vue'),
            meta: {
              title: '退出管理',
              navName: '退出管理'
            },
            TheLeftNavigation: false,
            TheTopNavigation: true
          }
        ]
      },
      // 顶部导航之消息中心
      {
        path: '/messageCenter',
        name: 'messageCenter',
        component: () => import('../views/messageCenter.vue'),
        meta: {
          title: '消息中心',
          navName: '消息中心'
        },
        TheLeftNavigation: false,
        TheTopNavigation: true
      },
      // 顶部导航之订单管理
      {
        path: '/orderManage',
        name: 'orderManage',
        component: () => import('../views/orderManage.vue'),
        meta: {
          title: '订单管理',
          navName: '订单管理'
        },
        TheLeftNavigation: false,
        TheTopNavigation: true
      },
      // 左侧导航之系统设置
      {
        path: '/systemSetup',
        name: 'systemSetup',
        component: () => import('../views/systemSetup.vue'),
        meta: {
          title: '系统设置',
          navName: '系统设置'
        },
        iconName: 'el-icon-s-tools',
        TheLeftNavigation: true,
        TheTopNavigation: false,
        // 系统设置二级菜单
        children: [
          {
            path: '/basicSetup',
            name: 'basicSetup',
            component: () => import('../views/basicSetup.vue'),
            meta: {
              title: '网站的基本设置',
              navName: '网站的基本设置'
            },
            TheLeftNavigation: true,
            TheTopNavigation: false
          },
          {
            path: '/myLinks',
            name: 'myLinks',
            component: () => import('../views/myLinks.vue'),
            meta: {
              title: '友情链接',
              navName: '友情链接'
            },
            TheLeftNavigation: true,
            TheTopNavigation: false
          }
        ]
      },
      // 用户管理
      {
        path: '/userControl',
        name: 'userControl',
        component: () => import('../views/userControl.vue'),
        meta: {
          title: '用户管理',
          navName: '用户管理'
        },
        iconName: 'el-icon-user-solid',
        TheLeftNavigation: true,
        TheTopNavigation: false,
        // 用户管理二级菜单
        children: [
          {
            path: '/userList',
            name: 'userList',
            component: () => import('../views/userList.vue'),
            meta: {
              title: '用户列表',
              navName: '用户列表'
            },
            TheLeftNavigation: true,
            TheTopNavigation: false
          },
          {
            path: '/addRegularUsers',
            name: 'addRegularUsers',
            component: () => import('../views/addRegularUsers.vue'),
            meta: {
              title: '添加普通用户',
              navName: '添加普通用户'
            },
            TheLeftNavigation: true,
            TheTopNavigation: false
          },
          {
            path: '/adminList',
            name: 'adminList',
            component: () => import('../views/adminList.vue'),
            meta: {
              title: '管理员列表',
              navName: '管理员列表'
            },
            TheLeftNavigation: true,
            TheTopNavigation: false
          },
          {
            path: '/addAdmin',
            name: 'addAdmin',
            component: () => import('../views/addAdmin.vue'),
            meta: {
              title: '添加管理员',
              navName: '添加管理员'
            },
            TheLeftNavigation: true,
            TheTopNavigation: false
          }
        ]
      },
      // 商品管理
      {
        path: '/productManage',
        name: 'productManage',
        component: () => import('../views/productManage.vue'),
        meta: {
          title: '商品管理',
          navName: '商品管理'
        },
        iconName: 'el-icon-s-goods',
        TheLeftNavigation: true,
        TheTopNavigation: false,
        // 商品管理二级菜单
        children: [
          {
            path: '/addGoods',
            name: 'addGoods',
            component: () => import('../views/addGoods.vue'),
            meta: {
              title: '添加商品',
              navName: '添加商品'
            },
            TheLeftNavigation: true,
            TheTopNavigation: false
          },
          {
            path: '/productList',
            name: 'productList',
            component: () => import('../views/productList.vue'),
            meta: {
              title: '商品列表',
              navName: '商品列表'
            },
            TheLeftNavigation: true,
            TheTopNavigation: false
          },
          {
            path: '/classifyGoods',
            name: 'classifyGoods',
            component: () => import('../views/classifyGoods.vue'),
            meta: {
              title: '商品分类',
              navName: '商品分类'
            },
            TheLeftNavigation: true,
            TheTopNavigation: false
          }
        ]
      }
    ]
  },
  {
    path: '/',
    name: 'exitRel',
    component: () => import('../views/exitRel.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
