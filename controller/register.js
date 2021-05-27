
module.exports = (req, res) => {
	// console.log("req =>",req.body);

	// 查询数据库中是否已经存在邮箱了
	api.findData("User", {
		email: req.body.rEmail
	}).then(result => {
		// 数据库没有该邮箱,向数据库添加一个邮箱
		if (result.length == 0) {
			let userId = "u_" + new Date().getTime();

			// 加密前端传过来的密码
			let password = utils.encodeString(req.body.rPassword);

			// 拿到前端输入的值，并写入到数据库中的user表里去
			api.createData("User", {
				userId,
				phone: req.body.rPhone,
				password,
				email: req.body.rEmail
			}).then(result => {
				res.send({ msg: "注册成功",status: 1000 ,result });
			}).catch(err => {
				res.send({ msg: "注册失败",status: 1001, data: err });
			})
		} else {
			res.send({ msg: "该邮箱已经被注册了",status: 1002 })
		}
	}).catch(err => {
		res.send({ msg: "查询失败", data: err })
	})

}