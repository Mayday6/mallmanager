// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import moment from 'moment'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import '@/assets/css/index.css'
import HttpTool from '@/pulign/http.js'

Vue.filter('fmtDate', function (v) {
  return moment(v).format('YYYY-MM-DD hh:mm:ss')
})
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(HttpTool)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
