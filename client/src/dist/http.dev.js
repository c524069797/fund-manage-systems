"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _elementUi = require("element-ui");

var _router = _interopRequireDefault(require("./router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var loading;

function startLoading() {
  loading = _elementUi.Loading.service({
    lock: true,
    text: '拼命加载中。。。',
    background: 'rgba(0,0,0,0,7)'
  });
}

function endLoading() {
  loading.close();
} //请求拦截


_axios["default"].interceptors.request.use(function (config) {
  startLoading();

  if (localStorage.eleToken) {
    //设置同意的请求头
    config.headers.Authorization = localStorage.eleToken;
  }

  return config;
}, function (error) {
  return Promise.reject(error);
}); //响应拦截


_axios["default"].interceptors.response.use(function (response) {
  endLoading();
  return response;
}, function (error) {
  endLoading();

  _elementUi.Message.error(error.response.data); //获取错误状态码


  var status = error.response.status;

  if (status == 401) {
    _elementUi.Message.error('token失效，重新登录！'); //清除token


    localStorage.removeItem('eleToken'); //再跳转到登录页面

    _router["default"].push('/login');
  }

  return Promise.reject(error);
});

var _default = _axios["default"];
exports["default"] = _default;