import Vue from 'vue'
import Router from 'vue-router'
// import project from './project/project' 

Vue.use(Router);
let router = new Router({ 
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/pages/Home')
    },{
      path: '/Echarts',
      name: 'Echarts',
      component: () => import('@/pages/Echarts')
    },{
      path: '/Table',
      name: 'Table',
      component: () => import('@/pages/Table')
    }
    // ...project
  ]
})
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
export default router;