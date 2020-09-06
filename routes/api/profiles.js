// @login & register 
const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
const passport = require("passport");
const mongoose = require("mongoose");
const Profile  = require("../../models/Profile");
const { ObjectId } = require("mongoose/lib/schema/index");
 
// 引入验证方法


// $route  GET api/profiles/test
// @desc   返回的请求的json数据
// @access public
 router.get("/test", (req, res) => {
  res.json({ msg: "profiles works" })
}) 
// $route  POST api/profiles/add
// @desc   创建信息接口
// @access private
router.post("/add",passport.authenticate('jwt', { session: false }), (req, res) => {
    const profileFields={};
    if(req.body.type) profileFields.type=req.body.type;
    if(req.body.describe) profileFields.describe=req.body.describe;
    if(req.body.income) profileFields.income=req.body.income;
    if(req.body.expend) profileFields.expend=req.body.expend;
    if(req.body.cash) profileFields.cash=req.body.cash;
    if(req.body.remark) profileFields.remark=req.body.remark;
    new Profile(profileFields).save().then(Profile=>{
        res.json(Profile);
    });
  })
// $route GET api/profiles
// @desc   获取所有信息
// @access private
  router.get("/",passport.authenticate('jwt', { session: false }), (req, res) => {
Profile.find ()
.then(profile=>
{
    if(!profile)
    {
        return res.sendStatus(404).json("啥也没有");
    }
    res.json(profile);
})
.catch(err=>res.status(404).json(err));
}) 
// $route GET api/profiles/:id
// @desc   获取单个
// @access private
router.get('/:id',passport.authenticate('jwt', { session: false }), (req, res) =>
 {
    Profile.findOne ({_id:req.params.id})
    .then(profile=>
    {
        if(!profile)
        {
            return res.sendStatus(404).json("啥也没有");
        }
        res.json(profile);
    })
    .catch(err=>res.status(404).json(err));
    }) 

// $route POST api/profiles/edit
// @desc   编辑信息接口
// @access private
router.post('/edit/:id',passport.authenticate('jwt', { session: false }), (req, res) => {
    const profileFields={};
    if(req.body.type) profileFields.type=req.body.type;
    if(req.body.describe) profileFields.type=req.body.describe;
    if(req.body.income) profileFields.income=req.body.income;
    if(req.body.expend) profileFields.expend=req.body.expend;
    if(req.body.cash) profileFields.cash=req.body.cash;
    if(req.body.remark) profileFields.remark=req.body.remark;
  Profile.findOneAndUpdate(
      {_id: req.params.id},
      {$set:profileFields},
      {"new": true }
  ).then(profile=>res.json(profile))
});

// $route POST api/profiles/delete/:id 
// @desc   删除信息接口
// @access private
router.delete('/delete/:id',passport.authenticate('jwt', { session: false }),
 (req, res) => {
  Profile.findOneAndRemove({_id: mongoose.Types.ObjectId(req.params.id)})//全部删除
  //把剩下在存进去
  .then(profile=>{
    if(profile)
    {
 res.json(profile);  
    }
    else
    res.status(404).json('删除失败');
  
      })
      .catch(error => res.status(404).json('删除失败'));
    }
);

module.exports = router;