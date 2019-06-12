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

const routes = [
  { path: '/', component: HomePage },
  { path: '/demo/01', component: Demo01 }
]

// Initialize the app
new Vue({
  el: '#app',
  router: new VueRouter({ routes }),
	template: `<router-view></router-view>`
})
