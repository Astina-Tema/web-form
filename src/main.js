import Vue from 'vue'
import App from './App.vue'
import { Lazyload } from 'vant';

import './assets/css/reset.css'
import './assets/css/public.css'
import './utils/rem'

import {Image as VanImage, Progress, Divider, Uploader, Icon, Form, Field, } from 'vant'
[VanImage, Progress, Divider, Uploader, Icon, Form, Field, ]
.forEach(component => {
  Vue.use(component)
})

Vue.use(Lazyload);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
