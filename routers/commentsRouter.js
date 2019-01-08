// 1.  引入模块
var express = require('express')
var commentsCtrl = require('../controllers/commentsCtrl.js')

// 2. 创建路由对象
var router = express.Router()

// 3. 配置路由信息
router.get('/comments',commentsCtrl.showCommentsPage) //  显示评论页面
  .get('/getCommentsData',commentsCtrl.getCommentsData) // 获取评论的数据
  .get('/getCommentsDataByPage',commentsCtrl.getCommentsDataByPage) // 根据页码获取评论数据
  .get('/delCommentsInfo',commentsCtrl.delCommentsInfoById)
  .get('/updateCommentsStatus', commentsCtrl.updateCommentsStatusById)

// 4. 向外导出或暴露对象
module.exports = router