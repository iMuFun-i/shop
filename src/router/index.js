import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')

// 1.安装VueRouter
Vue.use(VueRouter)

// 2.配置路由信息
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/category',
    component: Category,
    meta: {
      title: '分类'
    }
  },
  {
    path: '/cart',
    component: Cart,
    meta: {
      title: '购物车'
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      title: '我的'
    }
  },
  {
    path: '/detail',
    component: Detail,
    meta: {
      title: '详情页'
    }
  }
]

// 3.创建路由对象
const router = new VueRouter({
  mode: 'history',
  routes
})

// 4.创建路由全局前置守卫
router.beforeEach((to, from, next) => {
  // console.log(to);
  if (to.matched[0].meta.title) {
    document.title = to.matched[0].meta.title
  }
  next()
})

// 5.导出
export default router
