//引入model层操作数据库的方法
const {
    geArticleModel,
    saveArticleModel,
    getCountModel
} = require("../model/articleModel")

/*
*@describe 文章上传
*@param { _id,*articleName, *author,createTime,*category,*wordCount,*readTime,*content,*tag}
*@return
*/
const saveArticleCtr = async (req, res) => {
    let data = req.body
    let {
        articleName,
        author,
        category,
        wordCount,
        readTime,
        content,
        tag
    } = data;
    console.log(data,!articleName, !author , !category , !wordCount
    , !readTime , !content , !tag)
    if (!articleName || !author || !category || !wordCount
        || !readTime || !content || !tag
    ) {
        res.send({ status:1,data:'', msg: "参数少传递" })
        return
    }
    let count = await getCountModel();
    console.log(count,"==============count")
    if(count) data._id=1;
    data._id=count++;
    data.createTime = new Date();
    saveResult = await saveArticleModel(data);
    console.log(saveResult,"+++++++++++++++++saveResult")
    if (saveResult) {
        res.send({  status: 0,data:'', msg: "上传成功" })
    } else {
        res.send({ status:1,data:'', msg: "上传出错" })
    }
    //res.send("注册接口")
}


const getArticleCtr=async (req,res)=>{

}

module.exports = {
    saveArticleCtr,
    getArticleCtr
}