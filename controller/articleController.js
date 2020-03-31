const Url=require('url')
const {
    getArticleModel,
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
    if (!articleName || !author || !category || !wordCount
        || !readTime || !content || !tag
    ) {
        res.send({ status:1,data:'', msg: "参数少传递" })
        return
    }
    let count = await getCountModel();
    if(count) data._id=1;
    data._id=count++;
    data.createTime = new Date();
    saveResult = await saveArticleModel(data);
    if (saveResult) {
        res.send({  status: 0,data:'', msg: "success" })
    } else {
        res.send({ status:1,data:'', msg: "上传出错" })
    }
}

/*
*@describe 获取所有文章(分页)
*@param     *pageCount,*pageLimit
*@return
*/
const getArticleCtr=async (req,res)=>{
    let {pageCount,pageLimit}=Url.parse(req.url,true).query;
    if(!pageCount||!pageLimit){
        res.send({status:1,msg:'参数未传'})
    }
    pageCount=parseInt(pageCount)
    pageLimit=parseInt(pageLimit)
    if(isNaN(pageCount)||isNaN(pageLimit)){
        res.send({status:1,msg:'参数为非数'})
    }  
    console.log("======") 
    let _id=(pageCount-1)*10;
    const result=await getArticleModel({_id,pageLimit});
    let total = await getCountModel();
    console.log(result)
    if(result.length){
        res.send({status:0,data:{result,total},msg:'success'})
    }
}

module.exports = {
    saveArticleCtr,
    getArticleCtr
}