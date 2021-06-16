import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import 'element-ui/lib/theme-chalk/index.css';
import "@/assets/style/common.less";
import "@/assets/style/main.less";
import $http from '@/axios/expand';

import App from './App.vue';

Vue.prototype.$http = $http;
Vue.config.productionTip = false;

// 根据路由设置标题
router.beforeEach((to, from, next) => {
  /*路由发生改变修改页面的title */
  if(to.meta.title) {
    document.title = to.meta.title;
  }else{
    document.title = 'Test'
  }
  next();
})

new Vue({
    router,
    store,
    el: '#app',
    render: h => h(App),
    components: {App}
});