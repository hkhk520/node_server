// 工具层
// 工具库（公共方法）

// 导入加密模块（node核心模块） 不需要npm安装
const crypto = require('crypto');

// 导入发送邮箱的模块  npm i nodemailer --save
const nodemailer = require("nodemailer");

// 创建邮箱传输对象
let transporter = nodemailer.createTransport({
    // 发送的地址
    host: config.emailOptions.host,
    // 端口
    port: config.emailOptions.port,
    // 安全，当设置port为465，需要将secure设置为true
    secure: config.emailOptions.secure,
    // 授权用户
    auth: {
        // 用户名，邮箱号，即发送邮件的人
        user: config.emailOptions.user,
        // 授权码
        pass: config.emailOptions.pass
    }
});


class Utils {

    // 加密字符串的方法
    encodeString(value) {
        // value：被加密的字符串

        // 创建md5加密方式
        let md5 = crypto.createHash("md5");

        // 加密字符串
        let encode = md5.update(`${config.saltOptions.password}${value}`);

        return encode.digest("hex");
    }

    // 发邮件的方法
    sendEmail(options) {
        return new Promise((resolve, reject) => {
            // 发邮件
            transporter.sendMail(options, (err, info) => {
                if (err) {
                    // 发送失败
                    reject(err);
                } else {
                    // 发送成功
                    resolve(info);
                }
            })
        })
    }

    // 随机生成验证码的方法
    createRandomCode(n) {
        // n是验证码的字符串长度

        let chars = "0123456789qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM".split("");
        let codes = [];
        for (let i = 0; i < n; i++) {
            codes.push(chars[Math.floor(Math.random() * chars.length)])
        }
        return codes.join("");
    }

    // 签名token的方法  当用户登录了，需要生成一个token
    signToken(value) {
        return jsonwebtoken.sign({
            // 签名token的数据
            data: value
        }, config.saltOptions.token, { expiresIn: config.tokenOptions.expires });
    }

    // 解析token的方法
    verifyToken(token) {
        return new Promise((resolve, reject) => {
            // 验证token是否合法 config.saltOptions.token为之前生成token的加盐字符串
            jsonwebtoken.verify(token, config.saltOptions.token, (err, decoded) => {
                if (err) {
                    // 验证token失败
                    reject(err)
                } else {
                    // 在验证token成功后
                    resolve(decoded)
                }
            })
        })
    }

    // 将cookie转换成普通对象
    transformCookie(cookie) {
        // 把cookie分割
        let cookieArr = cookie.split("; ");
        if (cookieArr.length == 0) {
            return null;
        }
        let cookieObj = {};
        cookieArr.forEach(item => {
            let itemArr = item.split("=");
            cookieObj[itemArr[0]] = itemArr[1];
        });

        return cookieObj;
    }
}

module.exports = new Utils();