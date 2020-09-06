"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _mutations;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_vue["default"].use(_vuex["default"]);

var types = {
  SET_AUTHENTICATED: "SET_AUTHENTICATED",
  SET_USER: 'SER_USER'
};
var state = {
  isAuthenticated: false,
  user: {}
};
var getters = {
  isAuthenticated: function isAuthenticated(state) {
    return state.isAuthenticated;
  },
  user: function user(state) {
    return state.user;
  }
};
var mutations = (_mutations = {}, _defineProperty(_mutations, types.SET_AUTHENTICATED, function (state, isAuthenticated) {
  if (isAuthenticated) {
    state.isAuthenticated = isAuthenticated;
  } else state.isAuthenticated = false;
}), _defineProperty(_mutations, types.SET_USER, function (state, user) {
  if (user) state.user = user;else state.user = {};
}), _mutations);
var actions = {
  setAuthenticated: function setAuthenticated(_ref, isAuthenticated) {
    var commit = _ref.commit;
    commit(types.SET_AUTHENTICATED, isAuthenticated);
  },
  setUser: function setUser(_ref2, user) {
    var commit = _ref2.commit;
    commit(types.SET_USER, user);
  },
  clearCurrentState: function clearCurrentState(_ref3) {
    var commit = _ref3.commit;
    commit(types.SET_AUTHENTICATED, false);
    commit(types.SET_USER, null);
  }
};

var _default = new _vuex["default"].Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
});

exports["default"] = _default;