import Vue from 'vue'
import router from './router'
import $http from '@/axios/expand';

import App from './App.vue';

Vue.prototype.$http = $http;

Vue.config.productionTip = false;

new Vue({
    router,
    el: '#app',
    render: h => h(App),
    components: {App}
});
