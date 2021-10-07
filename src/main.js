import Vue from 'vue';
import App from '@/app.vue';
import router from '@/router';
import store from '@/store';
import '@/plugins/element';
import '@/assets/scss/index.scss';
import '@/registerServiceWorker';
import 'element-ui/lib/theme-chalk/display.css';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
