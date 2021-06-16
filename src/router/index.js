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
      path: '/echarts',
      meta:{
        title:'图表',
      },
      name: 'Echarts',
      component: () => import('@/pages/Echarts')
    },{
      path: '/table',
      meta:{
        title:'表单',
      },
      name: 'Table',
      component: () => import('@/pages/Table')
    },{
      path: '/detail/:id',
      meta:{
        title:'查看详情',
      },
      name: 'Detail',
      component: () => import('@/pages/Detail'),
      props:  { setDivProp: true,'data-id':'444' }
    },{
      path: '/tab',
      name: 'TabList',
      component: () => import('@/pages/TabList'),
      children: [{
          meta:{
            title:'表格',
          },
          path: 'table',
          component:  () => import('@/pages/list/TableList'),
        },{
          meta:{
            title:'列表',
          },
          path: 'ul',
          name: 'UlList',
          component:  () => import('@/pages/list/UlList'),
        },
       ]
    },{
      path: '*',
      name: '404',
      component: () => import('@/pages/404')
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