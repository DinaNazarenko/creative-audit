import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/LoginPage.vue'
import PasswordResetPage from '@/views/PasswordResetPage.vue'
import PasswordСreatePage from '@/views/PasswordСreatePage.vue'
import CreativePage from '@/views/CreativePage.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/password-reset',
    name: 'password-reset',
    component: PasswordResetPage,
    meta: {
      auth: false,
    },
  },
  {
    path: '/password-create/:link',
    name: 'password-create',
    component: PasswordСreatePage,
    meta: {
      auth: false,
    },
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/HomePage.vue'),
    meta: {
      auth: true,
    },
  },
  {
    path: '/creative/:id',
    name: 'creative',
    component: CreativePage,
    meta: {
      auth: false,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export const useUserToken = () => {
  return JSON.parse(localStorage.getItem('userToken')) || null
}

router.beforeEach((to, from, next) => {
  const token = useUserToken()

  if (!token && to.meta.auth) {
    next('/')
  } else {
    next()
  }
})

export default router
