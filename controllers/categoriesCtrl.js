// 1. 引入模块
var querystring = require('querystring')
var categoriesModel = require('../models/categoriesModel.js')
var urlModel = require('url')

// 2. 向外导出或是暴露对象
module.exports = {
  showCategoriesPage(req,res){ // 显示分类页面
    // 开启验证
    // if (!req.session.isLogin) {
    //   // 跳转到登陆页面
    //   res.redirect('/login')
    //   return;
    // }
    // 添加了验证是否登陆的数据
    res.render('categories', { isLogin: req.session.isLogin})
  },
  getAllCategoriesInfo(req,res){ // 获取所有的分类数据信息
    // 应该调用model层的方法，来获取所有的分类信息
    categoriesModel.getAllCategoriesInfo((err,categories)=>{
      if(err) return res.json({
        "code":1,
        "msg":"获取分类信息失败"
      })

      res.json({
        "code":0,
        "msg":"获取分类信息成功",
        "data": categories
      })
    })
  },
  addCategorieInfo(req,res){ // 添加新分类
    // 接收浏览器端传递过来的数据,调用model层的方法来真正的添加到数据库中
    var categories = req.body;
    // console.log(categories);
    categoriesModel.addCategorieInfo(categories,(err,isOK)=>{
      if(err) return res.json({
        "code":1,
        "msg":"添加失败"
      })

      categoriesModel.getAllCategoriesInfo((err,categories)=>{
        if(err) return res.json({
          "code":1,
          "msg":"添加之后返回数据出错"
        })

        res.json({
          "code": 0,
          "msg": "添加成功",
          "data":categories // 查询出来的数据是放在数组当中,数组当中的每一项都是对象
        })
      })
      
    })
  },
  delCategoriesInfoById(req,res){ // 根据id删除分类
    // 接收前端传递过来的id,调用model层的方法删除这一项数据
    var url = querystring.parse(req.url,'?','=',true); // 将get传递过来的路径进行解析
    // console.log(url);
    // res.end()
    categoriesModel.delCategoriesInfoById(url.id,(err,isOK)=>{
      if(err) return res.json({
        "code":1,
        "msg":"删除失败"
      })

      if(isOK){
        categoriesModel.getAllCategoriesInfo((err,categories)=>{
          if(err) return res.json({
            "code":1,
            "msg":"删除成功后,返回新数据失败"
          })

          res.json({
            "code":0,
            "msg":"删除成功",
            "data": categories
          })
        })
      }
    })
  },
  getCategoriesInfoById(req,res){ // 根据id获取分类信息
    // 接收传递过来的数据,调用model层的方法来查询对应的数据
    var query = urlModel.parse(req.url,true).query;
    var fn = (err, categories) => {
      if (err) return res.json({
        "code": 1,
        "msg": "查询出错"
      })

      res.json({   // 内部会自动的将我们传入的这个对象转换成字符串响应给前端浏览器
        "code": 0,
        "msg": "查询成功",
        "data": categories
      })
    }
    categoriesModel.getCategoriesInfoById(query.id,fn)

  },
  updateCategoriesInfoById(req,res){ // 根据id更新分类信息
    // 接收传递过来的数据,调用model层的方法,来更新数据
    var categoriesInfo = req.body;//  req.body可以获取post传递过来的数据
    // console.log(categories);
    // res.end()
    categoriesModel.updateCategoriesInfoById(categoriesInfo,(err,isOK)=>{
      if(err) return res.json({
        "code":1,
        "msg":"更新失败"
      })
         
      if(isOK){
        categoriesModel.getAllCategoriesInfo((err,categories)=>{
          if(err) return res.json({
            "code":1,
            "msg":"更新成功后的查询失败"
          })

          res.json({
            "code":0,
            "msg":"更新成功",
            "data":categories // 将更新后查询到的所有分类信息返回给浏览器端
          })
        })
      }
    })
  },
  delMoreCategoriesInfoByIds(req,res){ // 根据id批量删除分类
    // 接收传递过来的数据,调用model层的方法来删除数据库中的数据
    var ids = req.body['ids[]'];
    // console.log(ids);
    // res.end()
    categoriesModel.delMoreCategoriesInfoByIds(ids,(err,isOK)=>{
      if(err) return res.json({
        "code":1,
        "msg":"批量删除分类失败"
      })

      if(isOK){
        // 批量删除成功后,要将剩余的数据查询出来返回给浏览器端
        categoriesModel.getAllCategoriesInfo((err,categories)=>{
          if(err) return res.json({
            "code":1,
            "msg":"批量删除成功后的查询失败"
          })

          res.json({
            "code":0,
            "msg":"批量删除成功",
            "data":categories
          })
        })
      }
    })
  }
}