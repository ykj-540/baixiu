// 1. 引入模块
var navMenusModel = require('../models/navMenusModel.js')
var urlModel = require('url')

// 2. 向外导出或暴露对象
module.exports = {
  showNavMenusPage(req,res){
    res.render('nav-menus',{isLogin:req.session.isLogin})
  },
  getNavMenusData(req,res){
    // 调用model层的方法来查询所有的导航数据
    navMenusModel.getNavMenusData((err,result)=>{
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
  addNewNavMenus(req,res){ // 添加新导航项
    // 接收传递过来的值,然后调用model层的方法进行添加
    // console.log(req.body);
    // res.end()
    var navInfo = req.body;
    navMenusModel.addNewNavMenus(navInfo,(err,result)=>{
      if(err) return res.json({
        "code":1,
        "msg":"添加失败"
      })

      res.json({
        "code":0,
        "msg":"添加成功",
        "data":result
      })
    })
  },
  delNavMenusByIndex(req,res){
    var index = urlModel.parse(req.url,true).query.index
    navMenusModel.delNavMenusByIndex(index,(err,result)=>{
      if(err) res.json({
        "code":1,
        "msg":"删除失败"
      })

      res.json({
        "code":0,
        "msg":"删除成功",
        "data": result
      })
    })
  }
}