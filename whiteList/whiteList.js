// 请求域白名单
module.exports = {
    // 路径的白名单
    urlList: [
        "http://127.0.0.1:8080",
        "http://localhost:8080"
    ],

    // 验证码的白名单
    codeList: [
        "/register"
    ],

    // token的白名单
    tokenList: [
        "/createType"
    ]
}