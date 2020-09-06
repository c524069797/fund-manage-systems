"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Index = _interopRequireDefault(require("../views/Index.vue"));

var _Login = _interopRequireDefault(require("../views/Login.vue"));

var _Register = _interopRequireDefault(require("../views/Register.vue"));

var _ = _interopRequireDefault(require("../views/404.vue"));

var _Home = _interopRequireDefault(require("../views/Home.vue"));

var _Infoshow = _interopRequireDefault(require("../views/Infoshow.vue"));

var _FundList = _interopRequireDefault(require("../views/FundList.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vueRouter["default"]);

var router = new _vueRouter["default"]({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    redirect: '/index'
  }, {
    path: '/index',
    name: '/index',
    component: _Index["default"],
    children: [{
      path: '',
      component: _Home["default"]
    }, {
      path: '/home',
      name: 'home',
      component: _Home["default"]
    }, {
      path: '/infoshow',
      name: 'infoshow',
      component: _Infoshow["default"]
    }, {
      path: '/fundlist',
      name: 'fundlist',
      component: _FundList["default"]
    }]
  }, {
    path: '/register',
    name: 'register',
    component: _Register["default"]
  }, {
    path: '*',
    name: '/404',
    component: _["default"]
  }, {
    path: '/login',
    name: 'login',
    component: _Login["default"]
  }]
}); //路由守衛

router.beforeEach(function (to, from, next) {
  var isLogin = localStorage.eleToken ? true : false;

  if (to.path == '/login' || to.path == '/register') {
    next();
  } else {
    isLogin ? next() : next('/login');
  }
});
var _default = router;
exports["default"] = _default;