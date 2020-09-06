"use strict";

// @login & register 
var express = require("express");

var router = express.Router();

var bcrypt = require("bcrypt");

var jwt = require('jsonwebtoken');

var gravatar = require('gravatar');

var keys = require("../../config/keys");

var passport = require("passport");

var User = require("../../models/User"); // 引入验证方法
// $route  GET api/users/test
// @desc   返回的请求的json数据
// @access public

/* router.get("/test", (req, res) => {
  res.json({ msg: "login works" })
}) 
 */
// $route  POST api/users/register
// @desc   返回的请求的json数据
// @access public


router.post("/register", function (req, res) {
  // 查询数据库中是否拥有邮箱
  User.findOne({
    email: req.body.email
  }).then(function (user) {
    if (user) {
      return res.status(400).json({
        email: "邮箱已被注册!"
      });
    } else {
      var avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });
      var newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password,
        identity: req.body.identity
      });
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then(function (user) {
            return res.json(user);
          })["catch"](function (err) {
            return console.log(err);
          });
        });
      });
    }
  });
}); // $route  POST api/users/login
// @desc   返回token jwt passport
// @access public

router.post("/login", function (req, res) {
  var email = req.body.email;
  var password = req.body.password; // 查询数据库

  User.findOne({
    email: email
  }).then(function (user) {
    if (!user) {
      return res.status(404).json("用户不存在!");
    } // 密码匹配


    bcrypt.compare(password, user.password).then(function (isMatch) {
      if (isMatch) {
        var rule = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          identity: user.identity
        };
        jwt.sign(rule, keys.secretOrKey, {
          expiresIn: 3600
        }, function (err, token) {
          if (err) throw err;
          res.json({
            success: true,
            token: "Bearer " + token
          });
        }); // res.json({msg:"success"});
      } else {
        return res.status(400).json("密码错误!");
      }
    })["catch"](function (err) {
      console.log(err);
    });
  });
}); // $route  GET api/users/current
// @desc   return current user
// @access Private

router.get("/current", passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    identity: req.user.identity
  });
});
module.exports = router;