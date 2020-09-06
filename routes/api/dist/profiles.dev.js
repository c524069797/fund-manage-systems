"use strict";

// @login & register 
var express = require("express");

var router = express.Router();

var keys = require("../../config/keys");

var passport = require("passport");

var mongoose = require("mongoose");

var Profile = require("../../models/Profile");

var _require = require("mongoose/lib/schema/index"),
    ObjectId = _require.ObjectId; // 引入验证方法
// $route  GET api/profiles/test
// @desc   返回的请求的json数据
// @access public


router.get("/test", function (req, res) {
  res.json({
    msg: "profiles works"
  });
}); // $route  POST api/profiles/add
// @desc   创建信息接口
// @access private

router.post("/add", passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  var profileFields = {};
  if (req.body.type) profileFields.type = req.body.type;
  if (req.body.describe) profileFields.describe = req.body.describe;
  if (req.body.income) profileFields.income = req.body.income;
  if (req.body.expend) profileFields.expend = req.body.expend;
  if (req.body.cash) profileFields.cash = req.body.cash;
  if (req.body.remark) profileFields.remark = req.body.remark;
  new Profile(profileFields).save().then(function (Profile) {
    res.json(Profile);
  });
}); // $route GET api/profiles
// @desc   获取所有信息
// @access private

router.get("/", passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  Profile.find().then(function (profile) {
    if (!profile) {
      return res.sendStatus(404).json("啥也没有");
    }

    res.json(profile);
  })["catch"](function (err) {
    return res.status(404).json(err);
  });
}); // $route GET api/profiles/:id
// @desc   获取单个
// @access private

router.get('/:id', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  Profile.findOne({
    _id: req.params.id
  }).then(function (profile) {
    if (!profile) {
      return res.sendStatus(404).json("啥也没有");
    }

    res.json(profile);
  })["catch"](function (err) {
    return res.status(404).json(err);
  });
}); // $route POST api/profiles/edit
// @desc   编辑信息接口
// @access private

router.post('/edit/:id', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  var profileFields = {};
  if (req.body.type) profileFields.type = req.body.type;
  if (req.body.describe) profileFields.type = req.body.describe;
  if (req.body.income) profileFields.income = req.body.income;
  if (req.body.expend) profileFields.expend = req.body.expend;
  if (req.body.cash) profileFields.cash = req.body.cash;
  if (req.body.remark) profileFields.remark = req.body.remark;
  Profile.findOneAndUpdate({
    _id: req.params.id
  }, {
    $set: profileFields
  }, {
    "new": true
  }).then(function (profile) {
    return res.json(profile);
  });
}); // $route POST api/profiles/delete/:id 
// @desc   删除信息接口
// @access private

router["delete"]('/delete/:id', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  Profile.findOneAndRemove({
    _id: mongoose.Types.ObjectId(req.params.id)
  }) //全部删除
  //把剩下在存进去
  .then(function (profile) {
    if (profile) {
      res.json(profile);
    } else res.status(404).json('删除失败');
  })["catch"](function (error) {
    return res.status(404).json('删除失败');
  });
});
module.exports = router;