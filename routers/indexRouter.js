// 1. 引入模块
const express = require('express')
var indexCtrl = require('../controllers/indexCtrl.js')

// 2. 创建路由对象
var router = express.Router()

// 3. 实现路由监听 
// router.get('/',(req,res)=>{
//   indexCtrl.showIndexPage(req,res);
// })
router.get('/', indexCtrl.showIndexPage)
  .get('/index', indexCtrl.showIndexPage)
/**
 * 1. 接收请求并处理
 * 2. 调用indexCtrl.showIndexPage进行业务处理
 * 3. 把req,res传入到当前方法当中
 */

// 向外暴露路由对象，供app.js模块调用
module.exports = router

// ren *.html *.ejs