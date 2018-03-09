// import Vue from 'vue';

import Dialog from 'element-ui';
import axios from 'axios';
import {
  Message
} from 'element-ui';
import {
  loadToken
} from '@/utils/apiUtils';
import store from '@/store';

// Vue.use(Dialog);

const service = axios.create({
  timeout: 10000,
})

service.interceptors.request.use(config => {
  let token = loadToken();
  config.headers['Authorization'] = token; //每个请求携带token
  return config;
  if (token) {} else {
    // store.commit('LOGIN_OUT');
    // Message({
    //   center: true,
    //   message: '您的身份信息已过期，需重新登录',
    //   type: 'error',
    //   onClose: () => {
    //     window.location.replace('/login');
    //   }
    // });
  }
}, error => {
  console.log(error);
  Promise.reject(error);
})

service.interceptors.response.use(
  response => {
    // 返回status为-1时,状态为退出,跳转至登录;
    if (response.data.status == -1) {
      console.log('身份已过期');
      store.commit('LOGIN_OUT');
      Message({
        center: true,
        message: '您的身份信息已过期，需重新登录',
        type: 'error',
        onClose: () => {
          window.location.replace('/login');
        }
      });
    }
    return response;
  },
  err => {
    console.log(err);
  }
)

export default service;
