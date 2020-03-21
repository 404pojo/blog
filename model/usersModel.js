//操作数据库
const { mongoose } = require("../utils/connectMongoose")

//创建模型 Schema
const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    nickname: "",
    sex: "",
    email: "",
    phone: ""
})
//创建集合 model()
const Coll = mongoose.model("users", userSchema);

//保存数据(注册)

const registModel = (props = {}) => {
    //new 集合的名字
    const CollObj = new Coll(props)
    return CollObj.save()
        .then(res => res)
        .catch(err => {
            console.error(err)
            return false
        })
}

//查找数据
const findModel = (props = {}) => {
    return Coll.find(props)
        .then(res => res)
        .catch(err => {
            console.log(err)
            return false
        })
}

const login = () => { }

module.exports = {
    registModel,
    login,
    findModel
}