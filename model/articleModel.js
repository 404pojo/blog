//article表
const { mongoose } = require("../utils/connectMongoose")

const articleSchema = mongoose.Schema({
    _id:{type:Number,required:true},
    articleName: { type: String, required: true },
    author: { type: String, required: true },
    createTime:{type:Date,required:true},
    category: {type:String,required:true},
    wordCount: {type:Number,required:true},
    readTime: {type:Number,required:true},
    content: {type:String,required:true},
    tag:{type:Array,required:true}
})

const Coll = mongoose.model("articles", articleSchema);

//保存文章
const saveArticleModel = (props = {}) => {
    const CollObj = new Coll(props)
    return CollObj.save()
        .then(res => res)
        .catch(err => {
            console.error(err)
            return false
        })
}

// this.find({'_id': {"$lt": id}})
//                 .limit(5)
                // .sort({'_id':-1})
                // .exec(cb);
//获取所有文章
const getArticleModel = (props = {}) => {
    let {_id,pageLimit}=props
    return Coll.find({'_id':{'$gt':_id}})
        .limit(pageLimit)
        .then(res => res)
        .catch(err => {
            console.log(err)
            return false
        })
}
//获取记录数
const getCountModel=()=>{
    return Coll.find().countDocuments()
    .then(res => res)
    .catch(err => {
        console.log(err)
        return false
    })
}


module.exports = {
    saveArticleModel, 
    getArticleModel,
    getCountModel
}