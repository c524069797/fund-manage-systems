const express = require("express");
const app = express();
const bodyParser = require("body-parser"); 
const mongoose = require("mongoose");
 mongoose.set('useFindAndModify',false); 
const passport = require("passport");

// DB config
const db = require("./config/keys").mongoURI;
// 使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// passport 初始化
//app.use(passport.initialize());

require("./config/passport")(passport);

// 引入users.js
const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles"); 
//使用routes
app.use("/api/users",users);
app.use("/api/profiles",profiles);
// 连接 MongoDB 数据库
mongoose.connect("mongodb+srv://test1:czl990515@cluster0.azmu4.mongodb.net/test1?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log("连接MongoDB成功"))

const mongoDB = mongoose.connection
mongoDB.on("error",console.error)

const port = process.env.PORT || 5001;

app.listen(port,() => {
  console.log(`Server running on port ${port}`);
})
