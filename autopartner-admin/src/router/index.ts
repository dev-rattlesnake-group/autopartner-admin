import { createRouter, createWebHistory } from 'vue-router'
const LoginView = () => import('@/views/LoginView.vue')
const CustomersView = () => import('@/views/Customer/CustomersView.vue')
const ProductsView = () => import('@/views/Product/ProductsView.vue')
const CreateProductView = () => import('@/views/Product/CreateProductView.vue')
const UpdateProductView = () => import('@/views/Product/UpdateProductView.vue')
const NewsView = () => import('@/views/News/NewsView.vue')
import Routes from '@/router/routes.constants'
const CreateNewsView = () => import('@/views/News/CreateNewsView.vue')
const UpdateNewsView = () => import('@/views/News/UpdateNewsView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
      name: 'home',
      // component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/admin',
      redirect: 'customers',
    },
    {
      path: '/admin/customers',
      name: 'customers',
      component: CustomersView,
    },

    {
      path: '/admin/products',
      name: 'products',
      component: ProductsView,
    },
    {
      path: '/admin/products/create',
      name: 'createProduct',
      component: CreateProductView,
    },
    {
      path: '/admin/products/:id',
      name: 'updateProduct',
      component: UpdateProductView,
    },
    {
      path: '/admin/news',
      name: 'news',
      component: NewsView,
    },
    {
      path: '/admin/news/crerate',
      name: 'createNews',
      component: CreateNewsView,
    },
    {
      path: '/admin/news/:id',
      name: 'updateNews',
      component: UpdateNewsView,
    },
  ],
})
router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('user')
  const role: 'admin' | 'customer' = JSON.parse(user)?.role
  const isAuthohorize =
    String(to.path).startsWith(`/${role}`) ||
    Routes['public']?.includes(to.path)
  if (!isAuthohorize) {
    next('/login')
  } else {
    next()
  }
})

export default router
