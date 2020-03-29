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
const getArticleModel = (props = {}) => {
    return Coll.find(props)
        .then(res => res)
        .catch(err => {
            console.log(err)
            return false
        })
}

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