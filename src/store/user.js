import {
  login,
  userLogin,
  userLogout
} from '@/api/login';
import {
  topAgent,
  saveAgent,
  modifyTopAgent,
  preList,
  editNext,
  saveNext,
  initList,
  adminLisit,
  addAdmin,
  saveAdmin,
  addMember,
  accountOperate,
  adminOperate,
  editPwd
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
    userInfo: null,
    userName: null,
    level: null,
    token: false
  },
  mutations: {
    SET_USER: (state, user) => {
      state.userInfo = user.data;
      state.userName = user.data.user_name;
      state.level = user.data.level;
      state.token = true;
    },
    LOGIN_OUT: (state) => {
      setToken('user_id_token', null);
      state.userInfo = null;
      state.token = false;
      sessionStorage.removeItem('user_id_token');
      sessionStorage.removeItem('user');
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
    loginByaccount({
      commit
    }, userInfo) {
      const account = userInfo.account;
      const password = userInfo.password;
      return userLogin(account, password).then(response => {
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
    //会员退出
    userlogout({
      commit
    }, userInfo) {
      return userLogout().then(response => {
        // 当res中带有token并且与本地token不同时，更新一次;
        // setToken(response.headers.authorization);
        commit('LOGIN_OUT');
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
    },

    //管理员列表adminLisit
    adminListit({
      commit
    }, data) {
      return adminLisit(data).then(res => {
        return res;
      }).catch(err => {
        throw Error(err);
      })
    },
    //新增修改管理员
    addAdmin({
      commit
    }, data) {
      return addAdmin(data).then(res => {
        return res;
      }).catch(err => {
        throw Error(err);
      })
    },
    //保存管理员
    saveAdmin({
      commit
    }, data) {
      return saveAdmin(data).then(res => {
        return res;
      }).catch(err => {
        throw Error(err);
      })
    },
    //注册会员
    addMember({
      commit
    }, data) {
      return addMember(data).then(res => {
        return res;
      }).catch(err => {
        throw Error(err);
      })
    },
    //帐号停用/启用/删除
    accountOperate({
      commit
    }, data) {
      return accountOperate(data).then(res => {
        return res;
      }).catch(err => {
        throw Error(err);
      })
    },
    //子管理员启用/停用/删除
    adminOperate({
      commit
    }, data) {
      return adminOperate(data).then(res => {
        return res;
      }).catch(err => {
        throw Error(err);
      })
    },
    //修改密码
    editPwd({
      commit
    }, data) {
      return editPwd(data).then(res => {
        return res;
      }).catch(err => {
        throw Error(err);
      })
    }
  }
}

export default user;
