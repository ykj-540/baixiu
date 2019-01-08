// 1. 引入模块
var express = require('express')
var navMenusCtrl = require('../controllers/navMenusCtrl.js')

// 2. 创建路由对象
var router = express.Router()

// 3. 配置路由
router.get('/nav-menus', navMenusCtrl.showNavMenusPage) // 显示导航页面
  .get('/getNavMenusData',navMenusCtrl.getNavMenusData) // 获取导航数据
  .post('/addNewNavMenus',navMenusCtrl.addNewNavMenus) // 添加新导航数据
  .get('/delNavMenus',navMenusCtrl.delNavMenusByIndex)

// 4. 向外导出或是暴露对象
module.exports = router