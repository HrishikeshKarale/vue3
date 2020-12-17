"use strict";
exports.__esModule = true;
exports.useStore = exports.store = void 0;
var vuex_1 = require("vuex");
var state_1 = require("./state");
var mutations_1 = require("./mutations");
var actions_1 = require("./actions");
var getters_1 = require("./getters");
exports.store = vuex_1.createStore({
    plugins: process.env.NODE_ENV === "development" ? [vuex_1.createLogger()] : [],
    state: state_1.state,
    mutations: mutations_1.mutations,
    actions: actions_1.actions,
    getters: getters_1.getters
});
function useStore() {
    return exports.store;
}
exports.useStore = useStore;
