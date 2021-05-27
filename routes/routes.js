// 导入controller文件  控制器
const controller = require(path.resolve(__basename, "controller/controller.js"));

module.exports = app => {
  app.post("/register",controller.register);

  app.post("/login", controller.login);
  
  app.get("/email", controller.email);

  app.post("/sendValidCode", controller.sendValidCode);

  app.post("/createType", controller.createType);
}