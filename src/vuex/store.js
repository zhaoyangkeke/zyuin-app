import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 应用初始状态
export const state = {
  menu: [],
  user: sessionStorage.getItem('userRight')
}
// 定义所需的 mutations
const mutations = {
  setMenu (state, menus) {
    if (state.menu.length === 0 && menus) {
      state.menu = menus
    }
  },
  SET_USER: (state, data) => {
    state.token = data
    window.sessionStorage.setItem('user', data) 
  },
}
const actions = {
  saveMenu ({commit}, menus) {
    commit('setMenu', menus)// 提交到mutations中处理
  },
  saveUser ({commit}, data) {
    commit('SET_USER', data)// 提交到mutations中处理
  }
}
const getters = {
  getMenu (state) {
    return state.menu
  },
  getUser (state) {
    return state.user
  }
}
// 创建 store 实例
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
})
