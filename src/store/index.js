import Vue from 'vue'
import Vuex from 'vuex'
import { getUser, setUser } from '@/utils/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getUser
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
