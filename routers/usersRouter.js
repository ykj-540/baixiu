// 1. 引入模块
const express = require('express')
var usersCtrl = require('../controllers/usersCtrl.js')
var multer = require('multer')

// 2. 创建路由对象
var router = express.Router()

// 3. 实现路由监听 
// router.get('/users', (req, res) => {
//   usersCtrl.showUsersPage(req, res);
// })

router.get('/users', usersCtrl.showUsersPage) // 显示用户页面
  .post('/usersAdd', usersCtrl.userAdd) // 添加新用户
  .get('/delUser', usersCtrl.userDel)  // 删除用户
  .get('/editUserInfo',usersCtrl.showUserInfoById) // 显示单个用户信息
  .post('/updateUserInfo', usersCtrl.updateUserInfoById) // 更新用户信息
  .post('/delMoreUsers',usersCtrl.delMoreUsersByIds) // 批量删除用户
  .get('/login',usersCtrl.showLoginPage) // 显示登陆页面
  .post('/login', usersCtrl.userloginByEmailAndPassword) // 登陆
  .get('/logout',usersCtrl.userLogout) // 登出或是退出
  .get('/profile',usersCtrl.showProfilePage) // 显示个人中心
  .post('/uploadFile', multer({ dest: '/tmp/' }).single('avatar'),usersCtrl.updateFile) // 文件上传
  .post('/updatePorfileInfo',usersCtrl.updateProfileInfoById) // 更新个人中心

// 向外暴露路由对象，供app.js模块调用
module.exports = router