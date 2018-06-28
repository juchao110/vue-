import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Upload from '@/components/upload'
import Scroll from '@/components/scroll'
import VueScroll from '@/components/scroll2'
import Swiper from '@/components/swiper'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/upload',
      name: 'Upload',
      component: Upload
    },
    {
      path: '/scroll',
      name: 'Scroll',
      component: Scroll
    },
    {
      path: '/vuescroll',
      name: 'VueScroll',
      component: VueScroll
    },
    {
      path: '/swiper',
      name: 'Swiper',
      component: Swiper
    }
  ]
})
