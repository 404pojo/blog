var express = require('express');
var router = express.Router();

//引入控制层处理函数
const { loginCtr, registCtr } = require("../controller/usersController")
const {getArticleCtr,saveArticleCtr} =require('../controller/articleController')
//注册
router.post("/regist", registCtr)
//登入
router.post("/login", loginCtr)
//上传文章   (后台)
router.post('/saveArticle',saveArticleCtr)
//获取所有文章(前台分页)
router.get('/getArticle',getArticleCtr)




module.exports = router;
