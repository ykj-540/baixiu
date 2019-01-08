// 1. 引入模块
var categoriesModel = require('../models/categoriesModel.js')
var postsModel = require('../models/postsModel.js')
var path1 = require('path')
var fs = require('fs')
var urlModel = require('url')

// 2. 向外导出或是暴露对象
module.exports = {
  showPostAddPage(req,res){ // 显示的添加文章(写文章)页面
    // 写业务逻辑 
    // 开启验证
    // if (!req.session.isLogin) {
    //   // 跳转到登陆页面
    //   res.redirect('/login')
    //   return;
    // }
    // 添加了验证是否登陆的数据
    // 在页面渲染的时候，发现需要渲染出分类信息，因此应该调用model层的方式来查询数据库中的分类数据
    categoriesModel.getAllCategoriesInfo((err,result)=>{
      if(err) return console.log(err.message);
      // console.log(result);
      res.render('post-add', { isLogin: req.session.isLogin, categories: result, user: req.session.user })
    })
    
  },
  uploadFileOfPost(req,res){ // 添加文章(写文章)中的图片上传
    // 接收传递过来的图片信息
    // console.log(req.file);
    // res.end()
    // 从临时目录中获取图片,存储到指定的目录中
    var { path: pathTmp, filename, originalname } = req.file
    var imgPath = path1.join(__dirname, '../uploads/') + filename + originalname;
    // 生成图片要存储的路径  这个路径包括图片名称
    fs.readFile(pathTmp, (err, data) => {
      if (err) return res.json({
        "code": 1,
        "msg": "读取失败"
      })

      fs.writeFile(imgPath, data, (err) => {
        if (err) return res.json({
          "code": 1,
          "msg": "上传失败"
        })
        // 还应该返回图片在服务器端的路径
        var src = "/uploads/" + filename + originalname;
        res.json({
          "code": 0,
          "msg": "上传成功",
          "src": src
        })
      })
    })
  },
  addNewPost(req,res){ // 添加新文章
    // 接收传递过来的数据,调用model层的方法添加文章
    // console.log(req.body);
    // res.end()
    // 经过打印输出,发现很多字段数据都有，但是有两个没有一个是category_id,一个是user_id
    // user_id 是用user中的用户进行关联的id
    var post = req.body;
    post.category_id = post.category
    post.user_id = req.session.user.id //  user_id来源于登陆后的session中的数据
    delete(post.category) ;// 删除对象的某个属性
    // console.log(req.body);
    // res.end()
    postsModel.addNewPost(post,(err,isOK)=>{
      if(err) res.json({
        "code":1,
        "msg":"添加文章失败"
      })

      if(isOK){
        res.json({
          "code":0,
          "msg":"添加文章成功"
        })
      }
    })
  },
  showPostsPage(req,res){ // 显示所有文章的页面(posts)
    // 渲染posts页面
    res.render('posts',{isLogin:req.session.isLogin})
  },
  getPostsData(req,res){ // 所有文章页面的默认显示,比如默认只显示前10条
    // 调用model层的方法来获取所有的数据
    postsModel.getPostsData((err,result)=>{
      if(err) res.json({
        "code":1,
        "msg":"查询文章失败"
      })

      res.json({
        "code":0,
        "msg":"查询文章成功",
        "posts":result[0],
        "totalCount": Math.ceil(result[1][0]['count']/10)
      })
    })
  },
  getPostsDataByPage(req,res){ // 根据页码获取文章数据
    // 接收传递过来的页码数,调用model层的方法查询当前页面的文章
    // console.log(req.url);
    var page = urlModel.parse(req.url,true).query.page // 获取传递过来的页码
    // console.log(page);
    // res.end()
    postsModel.getPostsDataByPage(page,(err,result)=>{
      if(err) res.json({
        "code":1,
        "msg":"查询文章失败"
      })

      res.json({
        "code":0,
        "msg":"查询文章成功",
        "posts":result
      })
    })
  },
  delPostsById(req,res){
    // 接收传递过来的id，调用model层的方法删除文章
    var id = urlModel.parse(req.url,true).query.id;
    postsModel.delPostsById(id,(err,isOK)=>{
      if(err) return res.json({
        "code":1,
        "msg":"删除失败"
      })

      if(isOK){
        res.json({
          "code":0,
          "msg":"删除成功"
        })
      }
    })
  },
  showPostsEditPage(req,res){ // 显示文章编辑页面
    var id = urlModel.parse(req.url,true).query.id;
    // 调用model层的方法进行查询
    postsModel.getPostsInfoById(id,(err,result)=>{
      if(err) return res.render('error',{})

      // 渲染编辑页面
      res.render('postsEdit', { 
        isLogin: req.session.isLogin,
        posts:result[0][0],   // 获取到文章对象存在posts这个属性当中
        categories: result[1],  // 这是一个数组存在categories这个属性当中
      })
    })
    
  },
  uploadFileOfPostsEdit(req,res){
    // console.log(req.file);
    // res.end();
    var { path: pathTmp, filename, originalname } = req.file
    var imgPath = path1.join(__dirname, '../uploads/') + filename + originalname;
    // 生成图片要存储的路径  这个路径包括图片名称
    fs.readFile(pathTmp, (err, data) => {
      if (err) return res.json({
        "code": 1,
        "msg": "读取失败"
      })

      fs.writeFile(imgPath, data, (err) => {
        if (err) return res.json({
          "code": 1,
          "msg": "上传失败"
        })
        // 还应该返回图片在服务器端的路径
        var src = "/uploads/" + filename + originalname;
        res.json({
          "code": 0,
          "msg": "上传成功",
          "src": src
        })
      })
    })
  },
  updatePostsInfoById(req,res){
    // 接收传递过来的数据,调用model层的方法更新数据
    console.log(req.body); // 通过打印输出发现就缺少了一个user_id
    // res.end()
    var post = req.body
    postsModel.updatePostsInfoById(post,(err,isOK)=>{
      if(err) return res.json({
        "code":1,
        "msg":"更新失败"
      })

      if(isOK){
        res.json({
          "code":0,
          "msg":"更新成功"
        })
      }
    })
  }
  
}