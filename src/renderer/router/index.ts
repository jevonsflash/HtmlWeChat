import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const createRouter = () => new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: require('@/pages/main').default
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/transfer',
      name: 'main',
      component: require('@/pages/transfer').default
    }
  ]
})

const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher // reset router
}

export default router