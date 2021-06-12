import Vue from 'vue'
import App from './App.vue'
import { Lazyload } from 'vant';

import './assets/css/reset.css'
import './assets/css/public.css'
import './utils/rem'

Vue.use(Lazyload);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
