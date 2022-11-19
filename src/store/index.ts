// Vuex 配置文件
// Vuex 是专门为 Vue.js 设计的状态管理库，以利用 Vue.js 的细粒度数据响应机制来进行高效的状态更新。
// 参考链接 https://vuex.vuejs.org/zh/
import { createStore } from 'vuex';

const defaultState = {
  count: 0,
  token: '',
  repositoryList: [],
  ruleList: [],
  user: {},

  // 系统设置
  sideBarState: true
};

// 创建一个 store 实例
export default createStore({
  // 驱动应用数据源
  state() {
    return defaultState;
  },
  // 提交载荷 payload
  mutations: {
    increment(state: typeof defaultState) {
      state.count++;
    },
    setToken: (state, token) => {
      state.token = token;
    },
    setRepositoryList: (state, repositoryList) =>
      (state.repositoryList = repositoryList),
    setRuleList: (state, ruleList) => (state.ruleList = ruleList),
    setUser: (state, user) => (state.user = user),
    setSideBarState: (state, sideBarState) => {
      state.sideBarState = sideBarState;
    }
  },
  // action 提交操作 不直接更改状态 间接通过 mutations 去操作更新状态
  actions: {
    increment(context) {
      context.commit('increment');
    },
    setToken(token) {
      console.log(token);
      token.commit('token');
    },
    setRepositoryList(repositoryList) {
      repositoryList.commit('repositoryList');
    },
    setRuleList(ruleList) {
      ruleList.commit('ruleList');
    },
    setUser(user) {
      user.commit('user');
    },
    setSideBarState(sideBarState) {
      sideBarState.commit('sideBarState');
    }
  },
  // 属性状态访问函数
  getters: {
    double(state: typeof defaultState) {
      return 2 * state.count;
    },
    token(state: typeof defaultState) {
      return state.token;
    },
    repositoryList(state: typeof defaultState) {
      return state.repositoryList;
    },
    ruleList(state: typeof defaultState) {
      return state.ruleList;
    },
    user(state: typeof defaultState) {
      return state.user;
    },
    sideBarState(state: typeof defaultState) {
      return state.sideBarState;
    }
  }
});
