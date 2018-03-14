import {
  login
} from '@/api/login';
import {
  topAgent,
  saveAgent
} from '@/api/account';


import {
  loadToken,
  setToken,
  setUserInfo,
  getUserInfo
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
      window.localStorage.removeItem('user');
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
        // 当res中带有token并且与本地token不同时，更新一次;
        // setToken(response.headers.authorization);
        commit('SET_USER', response.data);
        setUserInfo(response.data.data);
        return response;
        // msg 1 账号密码不对 2 异常
        // console.log(response);
        // resolve();
      }).catch(err => {
        // reject(err);
        throw Error(err);
      })
      // })
    },
    addTopAgent({
      commit
    }, agentInfo) {
      return topAgent(agentInfo).then(response => {
        return response;
      }).catch(err => {
        throw Error(err);
      })
    },
    saveAgent({
      commit
    }, info) {
      return saveAgent(info).then(res => {
        return res;
      }).catch(err => {
        throw Error(err);
      })
    }
  }
}


export default user;
