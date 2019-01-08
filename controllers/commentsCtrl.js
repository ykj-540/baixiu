// 1. 引入模块
var commentsModel = require('../models/commentsModel.js')
var urlModel = require('url')
// 2. 向外导出或是暴露对象
module.exports = {
  showCommentsPage(req,res){
    res.render("comments", { isLogin: req.session.isLogin})
  },
  getCommentsData(req,res){
    // 调用model层的方法来查询评论数据
    commentsModel.getCommentsData((err,result)=>{
      if(err) return res.json({
        "code":1,
        "msg":"查询失败"
      })

      res.json({
        "code":0,
        "msg":"查询成功",
        "data":result[0],
        "totalPages": Math.ceil(result[1][0]['totalCount']/10) 
      })
    })
  },
  getCommentsDataByPage(req,res){
    // 接收前端传递过来的页码,调用model层的方法来查询数据
    var page = urlModel.parse(req.url,true).query.page
    commentsModel.getCommentsDataByPage(page,(err,result)=>{
      if(err) return res.json({
        "code":1,
        "msg":"查询失败"
      })

      res.json({
        "code":0,
        "msg":"查询成功",
        "data":result
      })
    })
  },
  delCommentsInfoById(req,res){
    // 接收传递过来的id,调用model层的方法进行数据的删除
    var id = urlModel.parse(req.url,true).query.id
    // console.log(urlModel.parse(req.url,true));
    // res.end()
    commentsModel.delCommentsInfoById(id,(err,isOK)=>{
      if(err) return res.json({
        "code":1,
        "msg":"删除失败"
      })

      res.json({
        "code":0,
        "msg":"删除成功"
      })
    })
  },
  updateCommentsStatusById(req,res){
    var id = urlModel.parse(req.url,true).query.id
    commentsModel.updateCommentsStatusById(id,(err,isOK)=>{
      if (err) return res.json({
        "code": 1,
        "msg": "批准失败"
      })

      res.json({
        "code": 0,
        "msg": "批准成功"
      })
    })
  }
}