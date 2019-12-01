import Vue from 'vue';
import Router from 'vue-router';

import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Contact from '../pages/Contact';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Verification from '../pages/Verification';
import NoAccess from '../pages/NoAccess';

//import PageView from '../pages/PageView';
//import OtherMap from '../pages/OtherMap';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/verification',
      name: 'verification',
      component: Verification
    },
    {
      path: '/noaccess',
      name: 'NoAccess',
      component: NoAccess
    },
    // {
    //   path: '/pageview',
    //   name: 'Page View',
    //   component: PageView
    // },
    {
      path: '*',
      name: '404',
      component: NotFound
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   // redirect to login page if not logged in and trying to access a restricted page
//   const publicPages = ['/login'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   if (authRequired && !loggedIn) {
//     return next({
//       path: '/login',
//       query: { returnUrl: to.path }
//     });
//   }
// });
