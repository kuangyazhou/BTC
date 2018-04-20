import axios from 'axios';
import {
  Message
} from 'element-ui';
import {
  loadToken
} from '@/utils/apiUtils';
import {
  requestPipe
} from '@/utils/repipe';

const service = axios.create({
  timeout: 10000,
  // 默认formData数据格式，
  headers: {
    'Content-Type': 'multipart/form-data'
  },
})

service.interceptors.request.use(config => {
  let token = loadToken();
  // const loading = Loading.service(options); //此loading为全屏
  config.headers['Authorization'] = token; //每个请求携带token
  return config;
  if (token) {} else {} //请求时只添加token 不做验证
}, error => {
  console.log(error);
  Promise.reject(error);
})

service.interceptors.response.use(
  response => {
    // var old = loadToken();

    requestPipe(response);
    // if (response.headers.authorization) {

    //   setToken(response.headers.authorization);
    //   console.log(old, response.headers.authorization, '更新token');
    // }

    // if (response.data.status == -1) {
    //   console.log('身份已过期');
    //   store.commit('LOGIN_OUT');
    //   Message({
    //     center: true,
    //     // message: '您的身份信息已过期，需重新登录',
    //     message: i18n.t('message.durDate'),
    //     duration: 1800,
    //     type: 'error',
    //     onClose: () => {
    //       if (!store.state.user.loginByAccount) {
    //         window.location.replace('/login');
    //       }

    //     }
    //   });
    // }
    return response;
  },
  err => {
    // console.log(err);
    // Promise.reject(err);
    console.log('err' + err);
    Message({
      message: '服务器故障',
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(err);
  }
)
export default service;
