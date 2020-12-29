"use strict";
exports.__esModule = true;
exports.getters = void 0;
exports.getters = {
    completedCount: function (state) {
        return state.list.filter(function (item) { return item.status; }).length;
    },
    totalCount: function (state) {
        return state.list.length;
    }
};
