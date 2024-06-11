import { createRouter, createWebHistory } from 'vue-router'
const LoginView = () => import('@/views/LoginView.vue')
const CustomersView = () => import('@/views/Customer/CustomersView.vue')
const CustomerView = () => import('@/views/Customer/CustomerView.vue')
const DashboardView = () => import('@/views/Dashboard/DashboardView.vue')
const ProductsView = () => import('@/views/Product/ProductsView.vue')
const OrdersView = () => import('@/views/Order/OrdersView.vue')
const OrderView = () => import('@/views/Order/OrderView.vue')
const CreateProductView = () => import('@/views/Product/CreateProductView.vue')
const CatalogueView = () => import('@/views/Catalogue/CatalogueView.vue')
const CartView = () => import('@/views/Cart/CartView.vue')
const FavoritesView = () => import('@/views/Favorites/FavoritesView.vue')
const CustomersInvoicesView = () => import('@/views/Invoice/CustomersInvoicesView.vue')
const UpdateProductView = () => import('@/views/Product/UpdateProductView.vue')
import Routes from '@/router/routes.constants'


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
      component: LoginView
    },
    {
      path: '/admin',
      redirect: 'customers'
    },
    {
      path: '/admin/customers',
      name: 'customers',
      component: CustomersView,
    },
    {
      path: '/admin/customers/:id',
      name: 'customer',
      component: CustomerView
    },
    {
      path: '/admin/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/admin/orders',
      name: 'orders',
      component: OrdersView
    },
    {
      path: '/admin/orders/:id',
      name: 'order',
      component: OrderView
    },
    {
      path: '/admin/invoices',
      name: 'invoices',
      component: CustomersInvoicesView
    },
    {
      path: '/admin/products',
      name: 'products',
      component: ProductsView
    },
    {
      path: '/admin/products/create',
      name: 'createProduct',
      component: CreateProductView
    },
    {
      path: '/admin/products/:id',
      name: 'updateProduct',
      component: UpdateProductView
    },
    {
      path: '/admin/settings',
      name: 'settings',
      component: DashboardView
    },

    {
      path: '/customer',
      redirect: '/customer/catalogue'
    },
    {
      path: '/customer/catalogue',
      name: 'catalogue',
      component: CatalogueView
    },
    {
      path: '/customer/favorites',
      name: 'favorites',
      component: FavoritesView
    },
    {
      path: '/customer/invoices',
      name: 'customer-invoices',
      component: CustomersInvoicesView
    },
    {
      path: '/customer/shopping-cart',
      name: 'shopping-cart',
      component: CartView
    },
    {
      path: '/customer/dashboard',
      name: 'customer-dashboard',
      component: DashboardView
    },



  ]
})
router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('user');
  const role: 'admin' | 'customer' = JSON.parse(user)?.role
  const isAuthohorize = String(to.path).startsWith(`/${role}`) || Routes['public']?.includes(to.path);
  if (!isAuthohorize) {
    next('/login');
  } else {
    next();
  }
});

export default router
