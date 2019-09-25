import Vue from 'vue'
import Router from 'vue-router'

import Home from '../pages/Home.vue'
import Contact from '../pages/Contact.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    }
  ]
})
