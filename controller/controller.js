// 控制器层

// 收藏所有控制器
let register = require(path.resolve(__basename, "controller/register.js"));
let login = require(path.resolve(__basename, "controller/login.js"));
let email = require(path.resolve(__basename, "controller/email.js"));
let sendValidCode = require(path.resolve(__basename, "controller/sendValidCode.js"));
let createType = require(path.resolve(__basename, "controller/createType.js"));
let toggleTypeStatus = require(path.resolve(__basename, "controller/toggleTypeStatus.js"));
let deleteHander = require(path.resolve(__basename, "controller/deleteHander.js"));

module.exports = {
  register,
  login,
  email,
  sendValidCode,
  createType,
  toggleTypeStatus,
  deleteHander
}