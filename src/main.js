import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import router from './router'
import request from './utils/request'
import  * as utils from './utils'

Vue.config.productionTip = false
Vue.prototype.request = request
Vue.prototype.$utils = utils

Vue.use(ElementUI);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
