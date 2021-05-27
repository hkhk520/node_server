// 中间件层

// 导入请求域白名单
const whiteList = require(path.resolve(__basename, "whiteList/whiteList.js"));

// 拦截层
module.exports = app => {

    // CORS 跨域资源共享
    // app.all(*)表示所有请求路径必须经过
    app.all('*', (req, res, next) => {
        // 指定允许跨域地址
        // res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500/");

        // 动态允许跨域的地址 获取请求的域名：req.headers.origin 等同于 *
        res.header("Access-Control-Allow-Origin", req.headers.origin);

        // *表示允许所有域请求，在实际开发中，一般指定允许某个域请求，如上面设置 当使用了*时，不能和跨域携带cookie一起使用的
        // res.header("Access-Control-Allow-Origin", "*");

        //如果浏览器请求包括Access-Control-Request-Headers字段，则Access-Control-Allow-Headers字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在"预检"中请求的字段。
        res.header("Access-Control-Allow-Headers", "X-Requested-With, content-type, token");

        //该字段必需，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次"预检"请求。
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

        //该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为true，如果服务器不要浏览器发送Cookie，删除该字段即可
        // res.header("Access-Control-Allow-Origin", "*") 和 res.header('Access-Control-Allow-Credentials', true) 不能一起使用的
        res.header('Access-Control-Allow-Credentials', true);

        // 是中间件，需要next()
        next();
    });

    // 检测option嗅探
    app.use((req, res, next) => {
        // console.log("req.method =>", req.method);
        if(req.method == "OPTIONS"){
            res.send(true)
        }else{
            next();
        }
    });

    app.use((req, res, next) => {
        // console.log("origin =>", req.headers.origin);
        if (whiteList.urlList.indexOf(req.headers.origin) > -1) {
            // 当前请求域存在whiteList白名单
            // 将请求传递下一个中间件或者路由
            next();
        } else {
            res.send("请求域拦截！");
        }
    });

    // 验证码拦截的中间件
    app.use((req, res, next) => {

        // /register?a=1
        // console.log("url =>",req.url);
        // console.log("body =>",req.body);

        // 处理URL，防止URL后面带参数
        let url = req.url.split("?")[0];
        if (whiteList.codeList.indexOf(url) > -1) {
            // 获取get或post请求的参数
            let params = req.body.codeId ? req.body : req.query;
            console.log("params =>", params);

            if (!params.codeId) {
                // 验证码不存在，为undefined
                return res.send({ msg: "验证码错误！", status: 2008 })
            }

            // 如果存在codeId，则需要根据获取验证码的邮箱、codeId、验证码的有效时间来验证当前的验证码
            api.findData("Code", {
                codeId: params.codeId
            }).then(result => {
                console.log("intercept =>",result);

                // 当在数据库找不到对应codeId的验证码时 （可能没有请求到验证码ID或者前端自己伪造一个验证码ID）
                if(result.length == 0){
                    return res.send({msg: "验证码不存在！！"});
                }

                // 保存查询数据库返回的结果数据
                let resultParams = result[0].dataValues;

                // 当用户输入的邮箱和查询数据库的邮箱是不同时
                if (params.rEmail != resultParams.email) {
                    res.send({ msg: "验证码邮箱有误！" });
                } else if (params.code != resultParams.code) {
                    res.send({ msg: "验证码有误！" });
                } else {
                    // 当前时间减去 5分钟的差值 的毫秒数
                    let time = +new Date() - config.codeOptions.expires * 60 * 1000;

                    // 创建验证码code的毫秒数
                    let codeTime = new Date(resultParams.createdAt);

                    if (codeTime > time) {
                        // 验证码有效，执行next()
                        next();
                    } else {
                        res.send({ msg: "验证码过期啦！" });
                    }
                }

            }).catch(err => {
                res.send("出错啦！");
                console.log("98 =>",err);
            })
        } else {
            console.log("无需验证验证码，直接通过");
            next();
        }

    });

    // token的拦截验证的中间件
    app.use((req, res, next) => {
        // 处理URL，防止URL后面带参数
        let url = req.url.split("?")[0];

        if (whiteList.tokenList.indexOf(url) > -1) {
            // 获取请求头的token
            let token = req.headers.token;
            // 格式化token，把拿到的每一个token存到对象里去
            let t = utils.transformCookie(token);

            // 如果token不存在，在结束
            if(!t){
                return res.send({msg: "请先登录！"})
            }
            
            // 获取有效的token信息
            let tkArr = [];
            config.tokenOptions.keys.forEach(key => {
                tkArr.push(t[key]);
            })
            // 拼接成之前的token，用 . 连接字符串
            let tkStr = tkArr.join(".");

            // 转换成合法有效的token
            utils.verifyToken(tkStr).then(result => {
                // 将userId存到req里去，传递给下一个中间件或路由
                req.userId = result.data;
                next();
            }).catch(err => {
                console.log("err =>",err);
            })
        }else{
            console.log("token无需验证，直接通过！！");
            next();
        }
    })
}