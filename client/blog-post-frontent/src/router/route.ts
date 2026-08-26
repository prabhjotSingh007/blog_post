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
        requireAuth: false
      }
    },
    {
      path: '/latest-blog',
      name: 'latest-blog',
      component: () => import('../pages/latest-blog/LastestBlog.vue'),
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/my-blog',
      name: 'my-blog',
      component: () => import('../pages/my-blog/MyBlog.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/add-blog',
      name: 'add-blog',
      component: () => import('../pages/add-blog/AddBlog.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/add-category',
      name: 'add-category',
      component: () => import('../pages/add-category/AddCategory.vue'),
      meta: {
        requireAuth: true,
        roleAllowed: ["ADMIN"]
      }
    },

    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  ]
})

router.beforeEach((to, from) => {
  // console.log(to, from)
  const user = getUserFromCookies();
  if (!user && to.meta.requireAuth) return { name: "login" };

  // Role check
  if (
    user &&
    to.meta.roleAllowed &&
    !(to.meta.roleAllowed as string[]).includes(user.role)
  ) {
    return { name: "home" };
  }

  // if (user && !to.meta.requireAuth) return { name: "home" };
  // if (!user && !to.meta.requireAuth) return { name: "home" };


  // if (!to.meta.requireAuth && user) {
  //   return { name: "dashboard" };
  // }
  // ...
  // explicitly return false to cancel the navigation
  return true
})


export default router