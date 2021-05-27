// 服务器基础配置层  开发环境的基础配置

exports.serverOptions = {
  // 主机
  host: "http://127.0.0.1",
  // 端口
  port: 9000
}

// 数据库配置
exports.mysqlOptions = {
  // 数据库名称
  database: "server",
  // 用户名
  user: "root",
  // 密码
  password: "root",
  // 连接主机
  host: "localhost",
  // 连接数据库类型
  dialect: "mysql",
  underscored: true,
  // 时区
  timezone: "+08:00"
}

// 加盐配置
exports.saltOptions = {
  // 密码加盐参数
  password: "_pws",
  // token加盐参数
  token: "_secret"
}

// 邮箱配置
exports.emailOptions = {
  // 发送的地址
  host: "smtp.126.com",
  // 端口
  port: 465,
  // 安全，当设置port为465，需要将secure设置为true
  secure: true,
  // 用户名，邮箱号，即发送邮件的人
  user: "hkhuangkai520@126.com",
  // 授权码
  pass: "VGQRZDZPHRVPSAHC"
}

// 验证码有效时间配置
exports.codeOptions = {
  // 单位分钟 minutes
  expires: 5,
}

// token参数配置
exports.tokenOptions = {
  // expiresIn: "1d" => 1天 , "3 days" => 3天 , "5h" => 5个小时 , 100 => 100秒 , "300" => 300ms
  expires: 60 * 60,
  // 保存token的真实key值
  keys: ["ydts", "asdw", "klia"]
}