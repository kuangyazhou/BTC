import {
  memberMoney,
  memberDeal,
  netSearch,
  memberNet,
  entrust,
  updateSpread,
  forceClose,
  review
} from '@/api/receive';

const receive = {
  state: {

  },
  mutations: {},
  actions: {
    //会员资金管理
    memberMoney({
      commit
    }, data) {
      return memberMoney(data).then(response => {
        return response;
      }).catch(err => {
        throw Error(err);
      })
    },

    //会员持仓单
    memberNet({
      commit
    }, data) {
      return memberNet(data).then(response => {
        return response;
      }).catch(err => {
        throw Error(err);
      })
    },

    //会员成交单
    memberDeal({
      commit
    }, data) {
      return memberDeal(data).then(response => {
        return response;
      }).catch(err => {
        throw Error(err);
      })
    },

    //持仓单查询(信用/现金)
    netSearch({
      commit
    }, data) {
      return netSearch(data).then(response => {
        return response;
      }).catch(err => {
        throw Error(err);
      })
    },

    //会员委托单审核
    entrust({
      commit
    }, data) {
      return entrust(data).then(response => {
        return response;
      }).catch(err => {
        throw Error(err);
      })
    },
    //会员委托单修改点差
    updateSpread({
      commit
    }, data) {
      return updateSpread(data).then(response => {
        return response;
      }).catch(err => {
        throw Error(err);
      })
    },
    //强制平仓
    forceClose({
      commit
    }, data) {
      return forceClose(data).then(response => {
        return response;
      }).catch(err => {
        throw Error(err);
      })
    },
    //审核
    review({
      commit
    }, data) {
      return review(data).then(response => {
        return response;
      }).catch(err => {
        throw Error(err);
      })
    }
  }
}

export default receive;
