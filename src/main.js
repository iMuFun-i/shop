import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast from 'components/common/toast'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

// 添加事件总线
Vue.prototype.$bus = new Vue()

// 注册 Toast 组件
Vue.use(Toast)

// 注册 VueLazyLoad 组件
Vue.use(VueLazyLoad, {
  preLoad: 1,
  loading: require('assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
