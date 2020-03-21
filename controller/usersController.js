//引入model层操作数据库的方法
const { registModel, login, findModel } = require("../model/usersModel")

//登入
const loginCtr = function (req, res) {
    //获取query参数
    console.log(req.query)
    res.send("登入接口")

}

//注册
//async await
const registCtr = async (req, res) => {
    //获取post请求传递的参数
    //注册流程
    //1.获取前端传递的数据 如果没有传递 直接返回错误信息
    //2.先查询数据库是否有重复用户名
    // 有=> 报错=>告诉前端已经存在用户名
    // 没有=>将用户信息保存到数据库
    const { username, password } = req.body;
    if (!username || !password) {
        res.send({ state: false, state: 0, msg: "参数少传递" })
        return
    }
    const isUnique = await findModel({ username })

    //判断查找结果 如果length为0 代表可以注册
    if (!isUnique.length) {
        const result = await registModel(req.body)
        if (result) {
            res.send({ state: true, status: 1, msg: "注册成功" })
        } else {
            res.send({ state: false, status: 0, msg: "注册出错" })
        }
    } else {
        res.send({ state: false, status: 0, msg: "用户名已注册" })
    }
    res.send("注册接口")
}


module.exports = {
    loginCtr,
    registCtr
}