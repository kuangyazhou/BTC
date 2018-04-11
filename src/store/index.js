import Vue from 'vue'
import Vuex from 'vuex'
import user from './user';
import receive from './receive';
import money from './money';

Vue.use(Vuex);

export default new Vuex.Store({
  //   state,
  //   mutations,
  //   actions
  modules: {
    user,
    receive,
    money
  }
});
