import { createRouter, createWebHistory } from 'vue-router'
const LoginView = () => import('@/views/LoginView.vue')
const CustomersView = () => import('@/views/Customer/CustomersView.vue')
const ProductsView = () => import('@/views/Product/ProductsView.vue')
const CreateProductView = () => import('@/views/Product/CreateProductView.vue')
const UpdateProductView = () => import('@/views/Product/UpdateProductView.vue')
const NewsView = () => import('@/views/News/NewsView.vue')
const CreateNewsView = () => import('@/views/News/CreateNewsView.vue')
import Routes from '@/router/routes.constants'
const CreateCustomerView = () =>
  import('@/views/Customer/CreateCustomerView.vue')
const UpdateNewsView = () => import('@/views/News/UpdateNewsView.vue')
const FeedbackView = () => import('@/views/Feedback/FeedbackView.vue')
const FeedbackCreateView = () =>
  import('@/views/Feedback/CreateFeedbackView.vue')
const FeedbackUpdateView = () =>
  import('@/views/Feedback/UpdateFeedbackView.vue')
const VacancyView = () => import('@/views/Vacancy/VacancyView.vue')
const VacancyCreateView = () => import('@/views/Vacancy/CreateVacancyView.vue')
const VacancyUpdateView = () => import('@/views/Vacancy/UpdateVacancyView.vue')
const EventsView = () => import('@/views/Events/EventsView.vue')
const CreateEventView = () => import('@/views/Events/CreateEventView.vue')
const UpdateEventView = () => import('@/views/Events/UpdateEventView.vue')

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
      redirect: 'accounts',
    },
    {
      path: '/admin/accounts',
      name: 'accounts',
      component: CustomersView,
    },
    {
      path: '/admin/accounts/create',
      name: 'createAccount',
      component: CreateCustomerView,
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
    {
      path: '/admin/feedbacks',
      name: 'feedbacks',
      component: FeedbackView,
    },
    {
      path: '/admin/feedbacks/crerate',
      name: 'createFeedback',
      component: FeedbackCreateView,
    },
    {
      path: '/admin/feedbacks/:id',
      name: 'updateFeedback',
      component: FeedbackUpdateView,
    },
    {
      path: '/admin/vacancies',
      name: 'vacancies',
      component: VacancyView,
    },
    {
      path: '/admin/vacancies/crerate',
      name: 'createVacancy',
      component: VacancyCreateView,
    },
    {
      path: '/admin/vacancies/:id',
      name: 'updateVacancy',
      component: VacancyUpdateView,
    },
    {
      path: '/admin/events',
      name: 'events',
      component: EventsView,
    },
    {
      path: '/admin/events/crerate',
      name: 'createEvent',
      component: CreateEventView,
    },
    {
      path: '/admin/events/:id',
      name: 'updateEvent',
      component: UpdateEventView,
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
