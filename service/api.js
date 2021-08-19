// 服务层  API层
// 操作数据库

class API {
    // 向数据库写入数据
    createData(modelName, values, t) {
        // modelName：模型名称，string
        // values：插入的数据，object
        // t: 事务处理对象，object
        if(t){
            return model[modelName].create(values, { transaction: t });
        }

        return model[modelName].create(values);
    }

    // 向数据库查询数据
    findData(modelName, condition, attributes) {
        // modelName：模型名称，string
        // condition：指定查询条件，object
        // attributes：指定返回的查询字段，Array，当不传递attributes，则默认查询返回所有字段
        return model[modelName].findAll({
            where: condition,
            attributes
        })
    }

    // 向数据库更新数据（假删除，逻辑删除）  假删除：就是改变数据库里面的某个字段，然后根据这个字段的值来查找对应的数据，实现假删除(即查找不出来)
    updateData(modelName, values, condition) {
        // modelName：模型名称，string
        // values：修改的数据，object
        // condition：指定查询条件，object
        return model[modelName].update(values, {
            where: condition
        })
    }

    // 事务处理
    // 回滚事务：如果执行事务处理的过程中，出现一条sql语句执行失败，则会执行事务回滚（恢复到执行事务处理之前的状态）
    // START TRANSACTION;    ROLLBACK;
    // 提交事务：如果执行事务处理的过程中，所有sql语句都执行成功，则会提交事务，数据则会永远保存在数据库中
    // START TRANSACTION;    COMMIT;
    transactionData(fn){
        return sequelize.transaction(fn)
    }
}

module.exports = new API()