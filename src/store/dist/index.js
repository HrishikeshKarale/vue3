"use strict";
exports.__esModule = true;
exports.useStore = exports.store = void 0;
const vuex_1 = require("vuex");
const state_1 = require("@/store/state");
const mutations_1 = require("@/store/mutations");
const actions_1 = require("@/store/actions");
const getters_1 = require("@/store/getters");
exports.store = vuex_1.createStore({
  plugins:
    process.env.NODE_ENV === "development" ? [vuex_1.createLogger()] : [],
  state: state_1.state,
  mutations: mutations_1.mutations,
  actions: actions_1.actions,
  getters: getters_1.getters
});
function useStore() {
  return exports.store;
}
exports.useStore = useStore;
