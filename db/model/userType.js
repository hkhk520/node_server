// 类型模型

// 导入sequelize，并且解构DataTypes，Model
const { DataTypes, Model } = require("sequelize");

// 创建UserType模型并且继承Model基类
class UserType extends Model{}

UserType.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    comment: "UserTypeid"
  },
  typeId: {
    type: DataTypes.STRING(30),
    unique: true,
    allowNull: false,
    defaultValue: "",
    comment: "类型id"
  },
  userId: {
    type: DataTypes.STRING(30),
    // unique 表示唯一性
    unique: false,
    allowNull: false,
    defaultValue: "",
    comment: "userId"
  },
}, {
  // 将模型映射到数据库中
  sequelize,
  // 定义表名
  tableName: "userType"
})

// UserType模型同步到mysql ,当表添加了新字段或修改某个字段时，需要把force改为true，因为需要重新删除表，再新建表
UserType.sync({ force: false });

// 导出UserType模型
module.exports = UserType;

