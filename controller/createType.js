

module.exports = (req, res) => {
    console.log("userId =>", req.userId);

    let typeId = "t_" + new Date().getTime();

    // 启动事务处理
    api.transactionData(async t => {
        await api.createData("Type", {
            typeId,
            name: "kai type"
        }, t)

        await api.createData("UserType", {
            typeId,
            userId: req.userId
        }, t)
    }).then(() => {
        res.send({msg: "创建成功！"})
    }).catch(err => {
        console.log("err =>",err);
        res.send({msg: "创建失败"})
    })
}