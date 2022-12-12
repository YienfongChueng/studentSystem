import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import router from './router'
import request from './utils/request'
import  * as utils from './utils'
import * as echarts from 'echarts'

Vue.config.productionTip = false
Vue.prototype.request = request
Vue.prototype.$utils = utils
Vue.prototype.$echarts = echarts

// 路由导航守卫
router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('username')) {
    if (to.path !== '/login') {
      next('/login')
    } else next()
  } next()
})

Vue.use(ElementUI);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
