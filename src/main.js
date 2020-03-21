// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { TabsPlugin, CardPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import NProgress from 'nprogress'

Vue.config.productionTip = false
Vue.use(firestorePlugin)
Vue.use(TabsPlugin)
Vue.use(CardPlugin)
Vue.use(NProgress)

firebase.initializeApp({
  apiKey: 'AIzaSyC4Es1MldmshiVVPssspU2r3AJLRM2A03E',
  authDomain: 'tents-6a9a9.firebaseapp.com',
  databaseURL: 'https://tents-6a9a9.firebaseio.com',
  projectId: 'tents-6a9a9',
  storageBucket: 'tents-6a9a9.appspot.com',
  messagingSenderId: '696968477288',
  appId: '1:696968477288:web:c9ee4e4e4f812cfcf199dd',
  measurementId: 'G-829LFF03EL'
})

export const db = firebase.firestore()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
