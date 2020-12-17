"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a;
exports.__esModule = true;
exports.mutations = exports.MutationType = void 0;
var MutationType;
(function (MutationType) {
    MutationType["CreateItem"] = "CREATE_ITEM";
    MutationType["SetItems"] = "SET_ITEMS";
    MutationType["CompleteItem"] = "COMPLETE_ITEM";
    MutationType["SetLoading"] = "SET_LOADING";
})(MutationType = exports.MutationType || (exports.MutationType = {}));
;
exports.mutations = (_a = {},
    _a[MutationType.CreateItem] = function (state, item) {
        //adds item to the beginning of an array
        state.list.unshift(item);
        //alternate implementation
        //state.list = [item, ...state.list];
    },
    _a[MutationType.SetItems] = function (state, list) {
        state.list = list;
    },
    _a[MutationType.CompleteItem] = function (state, newItem) {
        var index = state.list.findIndex(function (s) { return s.id === newItem.id; });
        if (index === -1)
            return;
        state.list[index] = __assign(__assign({}, state.list[index]), newItem);
    },
    _a[MutationType.SetLoading] = function (state, value) {
        state.loading = value;
    },
    _a);
