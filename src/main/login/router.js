import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
let router = new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: () => import('@/pages/Login')
    },
    {
      path: '/',
      name: 'main',
      component: () => import('@/pages/HomeL'),
      children:[{
        path: 'image',
        meta:{
          title:'图片',
        },
        name: 'Echarts',
        components: {
          default:() => import('@/pages/Home'),
          footer:() => import('@/pages/Demo'),
        }
      },{
        path: '404',
        name: '404',
        component: () => import('@/pages/404')
      }]
    }
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