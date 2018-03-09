// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import i18n from '@/i18n/i18n';
import store from '@/store';

import {
  currency
} from '@/utils/currency';

import '@/utils/format';
import '@/assets/css/normalize.css';
import 'font-awesome/css/font-awesome.min.css'
// import "element-ui/lib/theme-chalk/index.css";
import '@/assets/css/variables.scss';
import '@/assets/css/main.less';

Vue.config.productionTip = false;

// 货币格式化过滤器
Vue.filter('currency', currency);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: {
    App
  },
  template: '<App/>'
})
