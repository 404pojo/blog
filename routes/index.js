var express = require('express');
var router = express.Router();

//引入控制层处理函数
const { loginCtr, registCtr } = require("../controller/usersController")
//注册
router.post("/regist", registCtr)
//登入
router.post("/login", loginCtr)

module.exports = router;
