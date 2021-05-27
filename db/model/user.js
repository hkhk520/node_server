// 用户模型

// 导入sequelize，并且解构DataTypes，Model
const { DataTypes, Model } = require("sequelize");

// 创建User模型并且继承Model基类
class User extends Model{}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    comment: "表id"
  },
  userId: {
    type: DataTypes.STRING(30),
    unique: true,
    allowNull: false,
    defaultValue: "",
    comment: "用户id"
  },
  phone: {
    type: DataTypes.STRING(11),
    allowNull: false,
    comment: "手机号"
  },
  password: {
    type: DataTypes.STRING(200),
    allowNull: false,
    comment: "密码"
  },
  email: {
    type: DataTypes.STRING(24),
    allowNull: false,
    comment: "邮箱"
  }
}, {
  // 将模型映射到数据库中
  sequelize,
  // 定义表名
  tableName: "user"
})

// User模型同步到mysql ,当表添加了新字段或修改某个字段时，需要把force改为true，因为需要重新删除表，再新建表
User.sync({ force: false });

// 导出User模型
module.exports = User;

