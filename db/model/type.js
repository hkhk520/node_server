// 类型模型

// 导入sequelize，并且解构DataTypes，Model
const { DataTypes, Model } = require("sequelize");

// 创建Type模型并且继承Model基类
class Type extends Model{}

Type.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    comment: "类型id"
  },
  typeId: {
    type: DataTypes.STRING(30),
    unique: true,
    allowNull: false,
    defaultValue: "",
    comment: "类型id"
  },
  name: {
    type: DataTypes.STRING(200),
    allowNull: false,
    comment: "类型名"
  }
}, {
  // 将模型映射到数据库中
  sequelize,
  // 定义表名
  tableName: "type"
})

// Type模型同步到mysql ,当表添加了新字段或修改某个字段时，需要把force改为true，因为需要重新删除表，再新建表
Type.sync({ force: false });

// 导出Type模型
module.exports = Type;

