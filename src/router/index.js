import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'

// Website 
import Website from '../layouts/Website.vue'
import Home from '../views/website/Home.vue'

// Admin Portal
import AdminPortal from '../layouts/AdminPortal.vue'
import Dashboard from '../views/adminportal/Dashboard.vue'
import Settings from '../views/adminportal/Settings.vue'

import Register from '../views/adminportal/user/Register.vue'
import Profile from '../views/adminportal/user/Profile.vue'

import Contact from '../views/adminportal/contact/Contact.vue'

Vue.use(VueRouter)


//Auth Guard
const requireAuth = (to, from, next) => {
  let user = firebase.auth().currentUser
  console.log('current user in auth guard: ', user)
  if (!user) {
    next({ name: 'Home' })
  } else {
    next()
  }
}

// const requireNoAuth = (to, from, next) => {
//   let user = firebase.auth().currentUser
//   if (user) {
//     next({ name: 'Dashboard' })
//   } else {
//     next()
//   }
// }

const routes = [
  //Website
  {
    path: '/',
    component: Website,
    children:[
      {
        path: '',
        name: 'Home',
        component: Home,
        // beforeEnter: requireNoAuth
      },
    ]
  },

  //Admin Portal
  {
    path: '/adminportal',
    component: AdminPortal,
    children:[
      {
        path: '',
        name: 'Dashboard',
        component:Dashboard,
        beforeEnter: requireAuth
      },
      {
        path: '/register',
        name: 'Register',
        component: Register,
        beforeEnter: requireAuth
      },
      {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        beforeEnter: requireAuth
      },
      {
        path: '/settings',
        name: 'Settings',
        component: Settings,
        beforeEnter: requireAuth
      },
      {
        path: '/contact',
        name: 'Contact',
        component: Contact,
        beforeEnter: requireAuth
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
