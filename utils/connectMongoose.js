// 连接数据库
const mongoose = require("mongoose");

const url = "mongodb://127.0.0.1:27017/blog"
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true})

//connection会返回一个待定的链接状态 pending (promise封装)
const db = mongoose.connection;
db.on("error", console.error.bind(console, "数据库连接失败"))
db.once("open", function () {
    console.log("数据库连接成功")
})

//db.close()关闭数据库
module.exports = {
    mongoose,
    db
}