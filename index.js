// global.path => 把path变成全局变量

// 保存当前文件的绝对路径
global.__basename = __dirname;

// 导入path
global.path = require("path");

// 导入服务器基础配置文件config.js
global.config = require(path.resolve(__basename, "config/config.js"));

// 导入body-parser处理请求体模块 , 当method是post请求时   npm i body-parser --save
const bodyParser = require("body-parser");

// 导入发送邮箱的模块  npm i nodemailer --save
// global.nodemailer = require("nodemailer");

// 导入数据库文件，用来连接数据库和使用数据库
global.sequelize = require(path.resolve(__basename, "db/connect.js"));

// 导入所有模型
global.model = require(path.resolve(__basename, "db/model/model.js"));

// 导入service
global.api = require(path.resolve(__basename, "service/api.js"));

// 导入工具层
global.utils = require(path.resolve(__basename, "utils/utils.js"));

// 导入jsonwebtoken模块  npm i jsonwebtoken 
global.jsonwebtoken = require("jsonwebtoken");

// 导入中间件
let middleWare = require(path.resolve(__basename, "middleWare/intercept.js"));

const express = require("express");

let app = express();

// 测试连接数据库是否成功
(async function(){
  try{
    await sequelize.authenticate();
    console.log("数据库连接成功");
  }catch(err){
    console.log("数据库连接失败 =>",err);
  }
})()

// 解析post请求体 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// 解析 application/json 会在req对象添加一个body属性，该属性保存在post请求体的参数
app.use(bodyParser.json());

// 加载中间件
middleWare(app);

// 导入路由文件
let routes = require(path.resolve(__basename, "routes/routes.js"));
routes(app);

app.listen(config.serverOptions.port, () => {
  console.log("test 成功啦 主机是 =>" + config.serverOptions.host +" 端口号是 =>" + config.serverOptions.port);
})