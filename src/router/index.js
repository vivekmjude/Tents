import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import LandingPage from '@/components/LandingPage'
import AdminConsole from '@/components/AdminConsole'
import Login from '@/components/Login'
import NotFound from '../components/NotFound'
import NProgress from 'nprogress'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage
    },
    {
      path: '/console',
      name: 'AdminConsole',
      component: AdminConsole,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) {
    next('login')
  // } else if (!requiresAuth && currentUser) {
  //   // console.log(from, to, 'howdy', !requiresAuth, currentUser)
  //   next()
  } else next()
})

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

export default router
