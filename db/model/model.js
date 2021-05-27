// 模型层

// 收藏所有模型

// 导入User模型
const User = require(path.resolve(__basename, "db/model/user.js"));

// 导入Code模型
const Code = require(path.resolve(__basename, "db/model/code.js"));

// 导入Type模型
const Type = require(path.resolve(__basename, "db/model/type.js"));

// 导入UserType模型
const UserType = require(path.resolve(__basename, "db/model/userType.js"));

// 导出所有模型
module.exports = {
  User,
  Code,
  Type,
  UserType
}