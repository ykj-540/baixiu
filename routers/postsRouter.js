// 1. 引入模块
var express = require('express')
var postsCtrl = require('../controllers/postsCtrl.js')
var multer = require('multer')

// 2. 创建路由对象
var router = express.Router()
router.get('/post-add',postsCtrl.showPostAddPage)
  .post('/uploadFileOfPost', multer({ dest: '/tmp/' }).single('feature'), postsCtrl.uploadFileOfPost)
  .post('/addNewPost', postsCtrl.addNewPost)
  .get('/posts',postsCtrl.showPostsPage)
  .get('/getPostsData',postsCtrl.getPostsData)
  .get('/getPostsDataByPage', postsCtrl.getPostsDataByPage)
  .get('/delPostsById',postsCtrl.delPostsById) // 根据id删除文章
  .get('/postsEdit',postsCtrl.showPostsEditPage) // 显示文章编辑页面
  // .get('/getPostsInfoById',postsCtrl.getPostsInfoById) // 根据id获取当前的文章数据
  .post('/uploadFileOfPostsEdit', multer({ dest: '/tmp/' }).single('feature'),postsCtrl.uploadFileOfPostsEdit)
  .post('/updatePostsInfo',postsCtrl.updatePostsInfoById)

// 3. 向外导出或暴露对象
module.exports = router
