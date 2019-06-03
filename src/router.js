import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Projects from './views/Projects'
import Team from './views/Team'
import UserProfile from './views/UserProfile'
import Login from './components/LoginForm'
import {auth} from '@/fb'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/projects',
      name: 'projects',
      component: Projects,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/team',
      name: 'team',
      component: Team,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: UserProfile,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresAuth: false,
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  
  const needAuth = to.matched.some(route => route.meta.requiresAuth)
  console.log('auth.currentUser');
  console.log(auth.currentUser);

  if (needAuth && !auth.currentUser) {
      next({
          path: '/login',
          query: { redirect: to.fullPath }
      });
  } else {
      if (auth.currentUser && to.path === '/login') {
          const nextPath = to.query.redirect || '/';
          next({path: nextPath})
      } else {
          next()
      }
  }
})

export default router;
