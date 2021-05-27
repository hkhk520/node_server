// 导入发送邮箱的模块  npm i nodemailer --save
const nodemailer = require("nodemailer");

module.exports = (req, res) => {
    // 创建邮箱传输对象
    let transporter = nodemailer.createTransport({
        // 发送的地址
        host: "smtp.126.com",
        // 端口
        port: 465,
        // 安全，当设置port为465，需要将secure设置为true
        secure: true,
        // 授权用户
        auth: {
            // 用户名，邮箱号，即发送邮件的人
            user: "hkhuangkai520@126.com",
            // 授权码
            pass: "VGQRZDZPHRVPSAHC"
        }
    });

    // 发邮件
    transporter.sendMail({
        // 发送者的邮箱地址
        from: "hkhuangkai520@126.com",
        // 接收邮箱地址，如果存在多个接收地址，每一个邮箱地址需要使用 逗号 隔开
        to: "834705118@qq.com,2360490189@qq.com",
        // 邮件主题
        subject: "黄恺发送的邮件",
        // 邮件文本内容
        text: "你是真的狗呀",
        // 邮件HTML内容
        html: "<a href='https://github.com/hkhk520/niceCanteen.git'>你是真的狗呀，竟然叫我先打疫苗，拿我当试验品，艹~~</a>"
    }, (err, info) => {
        if (err) {
            // 发送失败
            res.send({ msg: "邮件发送失败！" });
        } else {
            // 发送成功
            res.send({ msg: "邮件发送成功", data: info });
        }
    })
}