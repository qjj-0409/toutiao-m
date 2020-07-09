import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { Dialog } from 'vant'
// import Login from '@/views/login/'
// const Login = () => import('@/views/login/')

Vue.use(VueRouter)

// 在路由表中给每个路由加上meta自定义数据，控制未登录状态路由的访问权限，true表示登录时才能访问，false表示未登录也能访问
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/'),
    meta: {
      requiresAuth: false // 添加额外的自定义数据
    }
  },
  {
    path: '/',
    component: () => import('@/views/layout/'),
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('@/views/home/'),
        meta: { requiresAuth: false }
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa/'),
        meta: { requiresAuth: false }
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video/'),
        meta: { requiresAuth: false }
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/'),
        meta: { requiresAuth: false }
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/'),
    meta: { requiresAuth: false }
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article/'),
    // 将动态路由参数映射到组件的props中，无论是访问还是维护性都很方便
    props: true,
    meta: { requiresAuth: false }
  },
  {
    path: '/user/:userId',
    name: 'user',
    component: () => import('@/views/user/'),
    // 将动态路由参数映射到组件的props中，无论是访问还是维护性都很方便
    props: true,
    meta: { requiresAuth: false }
  },
  {
    path: '/my/profile',
    name: 'my-profile',
    component: () => import('@/views/user-profile/'),
    meta: { requiresAuth: false }
  },
  {
    path: '/my/chat',
    name: 'my-chat',
    component: () => import('@/views/user-chat/'),
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  routes
})

// 配置路由拦截器
// to：要访问的页面路由信息
// from：来自哪个页面的路由信息
// next：放行的标记
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // 如果已经登录，则直接通过
    if (store.state.user) {
      return next()
    }
    // 如果没有登录，提示是否登录
    Dialog.confirm({
      title: '访问提示',
      message: '该功能需要登录才能访问，确认登录吗？'
    }).then(() => {
      // 携带当前页面路由，以在登录页面完成后返回当前页面
      router.replace({
        name: 'login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }).catch(() => {
      // 取消，中断路由导航
      next(false)
    })
  } else {
    // 不需要登录页面，直接过去
    next()
  }
})

export default router
