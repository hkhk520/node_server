module.exports = (req, res) => {
	// 当用户登录了，需要生成一个token
	// 定义一个用户id，用来签名一个token
	let userId = "uid_1314520";

	// 调用生成token的方法
	let token = utils.signToken(userId);

	// 需要对生成的token进行切片，防止被攻击
	let tokens = token.split(".");

	// 重新排序tokens
	let ts = {
	  asdw: tokens[1],
	  ydts: tokens[0],
	  klia: tokens[2],
	  // 干扰项
	  yoka: "9qY7e8VoXMAHWIDkTLPSWnTMzNzkxMzgsImV4cCIjcsI"
	}

	res.send({ msg: "登录成功", result: {data: req.body, token: ts} });
}