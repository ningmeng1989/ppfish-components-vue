import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/Cpnt/TreeSelect',
      name: 'TreeSelect',
      component: () => import('../views/treeSelect.vue')
    },
    {
      path: '/Cpnt/NumberCounter',
      name: 'NumberCount',
      component: () => import('../views/numberCounter.vue')
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited./* webpackChunkName: "about" */
    //   component: () => import('../views/About.vue')
    // }
  ]
})
