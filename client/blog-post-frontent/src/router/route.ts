import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '../pages/not-found/NotFound.vue'
import { getUserFromCookies } from '../services/cookies-service/CookiesService.ts'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/login/Login.vue'),
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../pages/register/Register.vue'),
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/home/Home.vue'),
      meta: {
        requireAuth: true
      }
    },

    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  ]
})

router.beforeEach((to, from) => {
  // console.log(to, from)
  const user = getUserFromCookies();
  if (!user && to.meta.requireAuth) return { name: "login" };
  // if (!to.meta.requireAuth && user) {
  //   return { name: "dashboard" };
  // }
  // ...
  // explicitly return false to cancel the navigation
  return true
})


export default router