// 验证邮箱是否正确

module.exports = (req, res) => {

    // 随机获取验证码
    let code = utils.createRandomCode(6);

    // 验证码ID
    let codeId = "c_" + new Date().getTime();

    // 把数据写入到数据库的code表里去
    api.createData("Code", {
        codeId,
        code,
        email: req.body.rEmail
    }).then(result => {
        // console.log("test =>",result);
        res.send({ msg: "成功把数据写入到code表里去！", status: 2000, result: { codeId: result.dataValues.codeId } });

        return;

        // 当成功把验证码code写入数据库之后，就发送邮件验证码
        utils.sendEmail({
            // 发送者的邮箱地址
            from: config.emailOptions.user,
            // 接收邮箱地址，如果存在多个接收地址，每一个邮箱地址需要使用 逗号 隔开
            to: req.body.rEmail,
            // 邮件主题
            subject: "注册的验证码",
            // 邮件文本内容
            text: `验证码：${code},${config.codeOptions.expires}分钟内有效`,
        }).then(result1 => {
            res.send({ msg: "获取验证码成功！", status: 2002, data: result1 })
        }).catch(() => {
            res.send({ msg: "获取验证码失败！", status: 2003 })
        })

    }).catch(() => {
        res.send({ msg: "写入失败！", status: 2001 })
    })
}