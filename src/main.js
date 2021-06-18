import Vue from 'vue'
// import { Lazyload } from 'vant';
import vueEsign from 'vue-esign'
import App from './App.vue'

import './assets/css/reset.css'
import './assets/css/public.css'
import './utils/rem'

import {
  Image as VanImage, Progress, Divider, Uploader, Icon, Form, Field, Cell, CellGroup, Popup, Picker,
  DatetimePicker, Button, RadioGroup, Radio, Notify, Toast, Dialog,  
} from 'vant'
[
  VanImage, Progress, Divider, Uploader, Icon, Form, Field, Cell, CellGroup, Popup, Picker,
  DatetimePicker, Button, RadioGroup, Radio, Notify, Toast, Dialog,  
].forEach(component => {
  Vue.use(component)
})

// Vue.use(Lazyload);
Vue.use(vueEsign)
Vue.config.productionTip = false

console.log(process.env.VUE_APP_BASE_API);

new Vue({
  render: h => h(App),
}).$mount('#app')