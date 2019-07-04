// Vue setup
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.config.productionTip = false
Vue.use(VueRouter)

// Styles
import '@/index.css'

// Routing
import HomePage from '@/home-page'
import Demo01 from '@/demos/01-projectile-2d-physics'
import Demo02 from '@/demos/02-transform-clock'

const routes = [
  { path: '/', component: HomePage },
  { path: '/demo/01', component: Demo01 },
  { path: '/demo/02', component: Demo02 }
]

// Initialize the app
new Vue({
  el: '#app',
  router: new VueRouter({ routes }),
	template: `<router-view></router-view>`
})
