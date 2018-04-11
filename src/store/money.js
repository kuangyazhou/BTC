import {
  recharge,
  chargeList,
  chartDetail,
  collection,
  collectionDel,
  collectionList,
  chargeUpdate,
  fillBill,
  reviewMoney,
  collectionCreate,
  collectionUpdate
} from '@/api/money';

const money = {
  state: {},
  mutations: {},
  actions: {
    recharge({
      commit
    }, data) {
      return recharge(data).then(response => {
        return response;
      }).catch(err => {
        throw Error(err);
      })
    },
    chargeList({
      commit
    }, data) {
      return chargeList(data).then(response => {
        return response;
      }).catch(err => {
        throw Error(err);
      })
    },
    chartDetail({
      commit
    }, data) {
      return chartDetail(data).then(response => {
        return response;
      }).catch(err => {
        throw Error(err);
      })
    },
    collection({
      commit
    }, data) {
      return collection(data).then(response => {
        return response;
      }).catch(err => {
        throw Error(err);
      })
    },
    collectionDel({
      commit
    }, data) {
      return collectionDel(data).then(response => {
        return response;
      }).catch(err => {
        throw Error(err);
      })
    },
    collectionList({
      commit
    }, data) {
      return collectionList(data).then(response => {
        return response;
      }).catch(err => {
        throw Error(err);
      })
    },
    chargeUpdate({
      commit
    }, data) {
      return chargeUpdate(data).then(response => {
        return response;
      }).catch(err => {
        throw Error(err);
      })
    },
    fillBill({
      commit
    }, data) {
      return fillBill(data).then(response => {
        return response;
      }).catch(err => {
        throw Error(err);
      })
    },
    reviewMoney({
      commit
    }, data) {
      return reviewMoney(data).then(response => {
        return response;
      }).catch(err => {
        throw Error(err);
      })
    },
    collectionCreate({
      commit
    }, data) {
      return collectionCreate(data).then(response => {
        return response;
      }).catch(err => {
        throw Error(err);
      })
    },
    collectionUpdate({
      commit
    }, data) {
      return collectionUpdate(data).then(response => {
        return response;
      }).catch(err => {
        throw Error(err);
      })
    }
  }
}

export default money;
