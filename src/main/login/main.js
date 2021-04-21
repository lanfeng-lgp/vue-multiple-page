import Vue from 'vue'
import router from './router'
import store from '@/store'
import 'element-ui/lib/theme-chalk/index.css';
import "@/assets/style/common.less";
import "@/assets/style/main.less";
import $http from '@/axios/expand';

import App from './App.vue';

Vue.prototype.$http = $http;

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    el: '#app',
    render: h => h(App),
    components: {App}
});
