/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";
exports.__esModule = true;
exports.useStore = exports.store = void 0;
const vuex = require("vuex");
const state = require("@/store/state");
const mutation = require("@/store/mutations");
const actions = require("@/store/actions");
const getters = require("@/store/getters");
exports.store = vuex.createStore({
  plugins: process.env.NODE_ENV === "development" ? [vuex.createLogger()] : [],
  state: state.state,
  mutations: mutation.mutations,
  actions: actions.actions,
  getters: getters.getters
});
function useStore() {
  return exports.store;
}
exports.useStore = useStore;
