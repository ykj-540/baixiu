// 1. 引入模块
var express = require('express')
var categoriesCtrl = require('../controllers/categoriesCtrl.js')

// 2. 创建路由对象
var router = express.Router();

// 3. 进行路由配置
router.get('/categories',categoriesCtrl.showCategoriesPage) // 显示分类首页面
  .get('/getAllCategoriesInfo', categoriesCtrl.getAllCategoriesInfo) // 获取所有的分类数据
  .post('/addCategorieInfo', categoriesCtrl.addCategorieInfo) // 添加新分类
  .get('/delCategoriesInfo',categoriesCtrl.delCategoriesInfoById) // 删除分类信息
  .get('/editCategoriesInfo',categoriesCtrl.getCategoriesInfoById) // 编辑分类之查询
  .post('/updateCategoriesInfo',categoriesCtrl.updateCategoriesInfoById) // 根据id更新分类信息
  .post('/delMoreCategoriesInfo', categoriesCtrl.delMoreCategoriesInfoByIds)

// 向外导出或是暴露路由对象
module.exports = router