import Vue from 'vue'
import { Lazyload } from 'vant';
import App from './App.vue'

import './assets/css/reset.css'
import './assets/css/public.css'
import './utils/rem'

import {
  Image as VanImage, Progress, Divider, Uploader, Icon, Form, Field, Cell, CellGroup, Popup, Picker,
  DatetimePicker, Button, RadioGroup, Radio, 
} from 'vant'
[
  VanImage, Progress, Divider, Uploader, Icon, Form, Field, Cell, CellGroup, Popup, Picker,
  DatetimePicker, Button, RadioGroup, Radio, 
].forEach(component => {
  Vue.use(component)
})

Vue.use(Lazyload);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
