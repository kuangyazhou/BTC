import {
  login
} from '@/api/login';

import {
  loadToken,
  setToken,
  setUserInfo
} from '@/utils/apiUtils';

import router from '@/router';

const user = {
  state: {
    userName: null,
    level: null
  },
  mutations: {
    SET_USER: (state, user) => {
      state.userName = user.data.user_name;
      state.level = user.data.level;
    },
    LOGIN_OUT: (state) => {
      setToken('user_id_token', null);
      window.localStorage.removeItem('user_id_token');
    }
  },
  actions: {
    loginByuserName({
      commit
    }, userInfo) {
      const name = userInfo.userName;
      const password = userInfo.pwd;
      // return new Promise((resolve, reject) => {
      return login(name, password).then(response => {
        setToken(response.headers.authorization);
        commit('SET_USER', response.data);
        setUserInfo(response.data);
        return response;
        // msg 1 账号密码不对 2 异常
        // console.log(response);
        // resolve();
      }).catch(err => {
        // reject(err);
        throw Error(err);
      })
      // })
    }
  }
}


export default user;
