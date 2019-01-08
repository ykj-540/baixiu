/**
 * 这个是主页面的业务逻辑,可以实现主页面的增删改查的业务逻辑控制
 */
// 1. 引入模块
var indexModel = require('../models/indexModel.js')

// 2. 向外导出或是暴露对象
module.exports = {
  showIndexPage(req, res) {
    //  console.log(req.session);
    // 开启验证
    // if(!req.session.isLogin){
    //   // 跳转到登陆页面
    //   res.redirect('/login')
    //   return;
    // }
    // 添加了验证是否登陆的数据

    // 调用model层的方法,查询对应的数据
    indexModel.getIndexPageData((err, result) => {
      res.render('index', {
        isLogin: req.session.isLogin,
        postsCount: result[0][0]['postsCount'],
        draftedCount: result[1][0]['draftedCount'],
        categoriesCount: result[2][0]['categoriesCount'],
        commentsCount: result[3][0]['commentsCount'],
        heldCount: result[4][0]['heldCount']
      })
    })

  }
}