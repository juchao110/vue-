// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/rem.js'
import './assets/lrz.js'
import '../build/api.js'
var infiniteScroll = require('vue-infinite-scroll');
Vue.use(infiniteScroll)
var VueTouch = require('vue-touch')
Vue.use(VueTouch, {
  name: 'v-touch'
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
