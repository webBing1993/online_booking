import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import actions from './actions/index'
import store from './states/index'

export default new Vuex.Store({
  actions: actions.actions,
  mutations: require('./mutations'),
  state: store,
})
