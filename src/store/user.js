import {
  login
} from '@/api/login';
import {
  topAgent,
  saveAgent,
  modifyTopAgent,
  preList,
  editNext,
  saveNext,
  initList
} from '@/api/account';

import {
  loadToken,
  setToken,
  setUserInfo,
  getUserInfo
} from '@/utils/apiUtils';

import router from '@/router';

// 帐号管理功能业务逻辑及条件
// 1.管理员新增、修改、保存一级代理时，调用top-agent save-topAgent modifyTopAgent接口
// 2.新增、修改、保存其他级别代理时，走另外接口
// 3.当所添加的代码与本身级别相差大于2级时，请求所有上级列表，例如。二级代理增加四级时，需先选择所有三级代理帐号

const user = {
  state: {
    userName: null,
    level: null,
    token: false
  },
  mutations: {
    SET_USER: (state, user) => {
      state.userName = user.data.user_name;
      state.level = user.data.level;
      state.token = true;
    },
    LOGIN_OUT: (state) => {
      setToken('user_id_token', null);
      window.localStorage.removeItem('user_id_token');
      window.localStorage.removeItem('user');
    }
  },
  actions: {
    // 登录
    loginByuserName({
      commit
    }, userInfo) {
      const name = userInfo.userName;
      const password = userInfo.pwd;
      return login(name, password).then(response => {
        // 当res中带有token并且与本地token不同时，更新一次;
        // setToken(response.headers.authorization);
        commit('SET_USER', response.data);
        setUserInfo(response.data.data);
        return response;
        // resolve();
      }).catch(err => {
        throw Error(err);
      })
    },
    // 新增一级代理
    addTopAgent({
      commit
    }, agentInfo) {
      return topAgent(agentInfo).then(response => {
        return response;
      }).catch(err => {
        throw Error(err);
      })
    },
    // 修改一级代理
    MODIFYTOPAGENT({
      commit
    }, info) {
      return modifyTopAgent(info).then(response => {
        return response;
      }).catch(err => {
        throw Error(err);
      })
    },
    // 保存一级代理
    SAVEAGENT({
      commit
    }, info) {
      return saveAgent(info).then(response => {
        return response;
      }).catch(err => {
        throw Error(err);
      })
    },
    // 帐号默认列表
    INITLIST({
      commit
    }, data) {
      return initList(data).then(response => {
        return response;
      }).catch(err => {
        throw Error(err);
      })
    },

    //上级帐号列表
    PRELIST({
      commit
    }, info) {
      return preList(info).then(response => {
        return response;
      }).catch(err => {
        throw Error(err);
      })
    },
    //新增修改下级帐号
    EDITNEXT({
      commit
    }, data) {
      return editNext(data).then(response => {
        return response;
      }).catch(err => {
        throw Error(err);
      })
    },
    //保存下级帐号
    SAVENEXT({
      commit
    }, data) {
      return saveNext(data).then(response => {
        return response;
      }).catch(err => {
        throw Error(err);
      })
    }
  }
}

export default user;
