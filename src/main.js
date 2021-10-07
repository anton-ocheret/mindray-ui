import Vue from 'vue';
import App from '@/app.vue';
import router from '@/router';
import store from '@/store';

import { QUIZES_ROUTE_NAMES } from '@/modules/quizes';
import { RESULTS_ROUTE_NAMES } from '@/modules/results';

import '@/plugins/element';
import '@/registerServiceWorker';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/scss/index.scss';

Vue.config.productionTip = false;
console.log();

new Vue({
  router,
  store,
  render: (h) => h(App),
  ROUTE_NAMES: {
    ...QUIZES_ROUTE_NAMES,
    ...RESULTS_ROUTE_NAMES,
  },
}).$mount('#app');
