import Vue from 'vue'
import Vuex from 'vuex'
import { setUser } from '@/utils/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem('user'))
  },
  mutations: {
    addUser (state, data) {
      state.user = data
      setUser(state.user)
    }
  },
  actions: {

  }
})
