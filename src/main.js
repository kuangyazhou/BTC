// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import i18n from '@/i18n/i18n';

import '@/assets/css/normalize.css'
// import "element-ui/lib/theme-chalk/index.css";
import '@/assets/css/main.less';
import '@/assets/css/variables.scss';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: {
    App
  },
  template: '<App/>'
})
