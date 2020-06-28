import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import category from './category'
import record from './record'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    async fetchCurrency() {
      const key = '8919dca4bfc92ed03457694d'
      const res = await fetch(`https://prime.exchangerate-api.com/v5/${key}/latest/USD`)
      const result = await res.json()
      return result
    }
  },
  getters: {
    error: s => s.error
  },
  modules: {
    auth, info, category, record
  }
})
