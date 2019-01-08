// 1.  引入model模块
var usersModel = require('../models/usersModel.js')
var querystring = require('querystring')
var fs = require('fs')
var path1 = require('path')
// 1. 向外暴露对象
module.exports = {
  showUsersPage(req,res){ // 显示用户界面
    // 开启验证
    // if (!req.session.isLogin) {
    //   // 跳转到登陆页面
    //   res.redirect('/login')
    //   return;
    // }
    usersModel.getAllUsers((err,data)=>{
      // data是一个数组，是model里面查询出来的数据
      if(err) return console.log(err.message);
      res.render('users', { list: data, isLogin: req.session.isLogin})
    })
  },
  userAdd(req,res){ // 添加新用户
    /**
     * 1. 接收POST过来的数据 使用req.body来接收
     * 2. 调用model层的方法,添加数据
     * 3. 
     */
    // var dataStr = ''
    // req.on('data',(chunk)=>{
    //   dataStr += chunk;
    // })
   var user = req.body;
    user.status = 'activated'
    user.avatar = '/uploads/avatar.jpg'
    usersModel.userAdd(user,(err,isOK)=>{
      if(err) return res.end('404')
      if(isOK){
        // 读取数据库的所有的数据,返回给浏览器
        usersModel.getAllUsers((err, data) => {
          // data是一个数组，是model里面查询出来的数据
          if (err) return res.end('404');
          
          // 状态码  状态描述  数据
          // var obj = {
          //   "code":1,
          //   "msg":"添加成功",
          //   "data":data
          // }
          // // res.end(JSON.stringify(obj));// 将数据返回给前台浏览器
          // res.json(obj)
          res.json({
            "code": 1,
            "msg": "添加成功",
            "data": data
          })
        })
      }
    })
  },
  userDel(req,res){
    /**
     * 写业务逻辑
     * 1. 接收传递过来的id
     * 2. 调用model中的方法根据id删除对应的数据
     * 3. 根据model中返回中返回的状态,再向浏览器返回数据
     * 4. 获取剩余的所有的用户,返回给浏览器
     */
    // console.log(req.url);
    // parse可以让我们人为的指定界定符
    var url = querystring.parse(req.url,'?','=',true)
    var id = url.id;
    // console.log(id);
    //  /delUser?id=10&name=tom&age=10
    usersModel.userDel(id,(err,isOK)=>{
      if(err) return res.end('删除失败')
      if(isOK){
        usersModel.getAllUsers((err,data)=>{
          if(err) return res.end('删除数据后,查询数据失败')
          // var obj = {
          //   "code":1,
          //   "mseg":"删除成功",
          //   "data":data
          // }
          // res.end(JSON.stringify(obj))
          res.json({
            "code": 1,
            "mseg": "删除成功",
            "data": data
          })
        })
      }else {
        // var obj = {
        //   "code": 0,
        //   "mseg": "删除失败"
        // }
        // res.end(JSON.stringify(obj))
        res.json({
          "code": 0,
          "mseg": "删除失败"
        })
      }
    })
  },
  showUserInfoById(req,res){
    // 在此处写业务逻辑, 接收用户传递过来的id,然后调用model层中的方法,查询当前id的那条用户数据
    // console.log(req.url);
    var url = querystring.parse(req.url,'?','=',true)
    // console.log(url);
    var id = url.id; //  获取传递过来的id
    // 调用model层中的方法来根据id查询数据
    usersModel.showUserInfoById(id,(err,user)=>{
      // res.json会自动的将传入的这个对象转换成字符串响应给前端页面
      if(err) return res.json({
        // 如果成功 code:0   如果失败:code:1
        "code":1,
        "msg":"查询失败"
      })

      res.json({
        "code":0,
        "msg":"查询成功",
        "data":user
      })
    })
  },
  updateUserInfoById(req,res){
    // 接收传递过来的数据,然后调用model层的方法更新数据
    var user = req.body;
    // console.log(user);
    usersModel.updateUserInfoById(user,(err,isOK)=>{
      if(err) return res.json({
        "code":1,
        "msg":"更新失败"
      })

      if(isOK){
        // 获取更新后的所有的用户信息,返回给浏览器，然后渲染到页面上
        usersModel.getAllUsers((err,users)=>{
          if(err) return res.json({
            "code":1,
            "msg":"更新成功,返回更新后的结果失败"
          })

          res.json({
            "code":0,
            "msg":"查询成功",
            "data":users
          })
        })
      }

    })
  },
  delMoreUsersByIds(req,res){
    // 接收前端传递过来的ids,调用model中的方法来删除数据库中的数据
    var ids = req.body['ids[]'];

    usersModel.delMoreUsersByIds(ids,(err,isOK)=>{
      if(err) res.json({
        "code":1,
        "msg":"删除失败"
      })

      if(isOK){
        // 查询剩余的用户,返回给前端页面
        usersModel.getAllUsers((err,users)=>{
          if(err) res.json({
            "code":1,
            "msg":"删除数据成功后查询数据时出错"
          })

          res.json({
            "code":0,
            "msg":"查询用户成功",
            "data":users
          })
        })
      }
    })
  },
  showLoginPage(req,res){
    res.render('login',{})
  },
  userloginByEmailAndPassword(req,res){ // 使用邮箱和密码登陆系统
    // 接收传递过来的email和password, 调用model层的方法查询用户名是否存在
    var user = req.body
    // console.log(user);
    // res.end();
    usersModel.userloginByEmailAndPassword(user,(err,userInfo)=>{
      if(err) return res.json({
        "code":1,
        "msg":"登陆失败"
      })

      if(err==false) return res.json({
        "code":1,
        "msg":"账号或密码不对"
      })
      
      // 设置session
      req.session.isLogin = true;
      req.session.user = userInfo;// 把查询到的当前用户信息存到session
      // session信息是在每一个页面共享的
      res.json({
        "code":0,
        "msg":"登陆成功"
      })
    })
  },
  userLogout(req,res){
    // 登出意味着让服务端销毁session,然后跳转到登陆页面
    req.session.destroy((err)=>{
      if(err) return console.log(err.message);
      res.redirect('/login')
    })
  },
  showProfilePage(req,res){  //  显示个人中心页面
    // 开启验证
    if(!req.session.isLogin){
      res.redirect('/login')
      return
    }
  
    // 获取当前登陆的用户信息,显示在个人中心
    // 调用model层的方法,得传入id ,获取当前最新的项
    // console.log(req.session);
    var {id} = req.session.user;
    usersModel.getProfileInfoById(id, (err, profileInfo)=>{
      if(err) return res.redirect('/index',{})

      // 应该渲染页面
      // res.render('profile',profileInfo) // 这是原来的渲染方式
      res.render('profile', {isLogin:req.session.isLogin, profileInfo: profileInfo, user: req.session.user})
    })
    
  },
  updateFile(req,res){
    // 可以暂时不与model进行交互
    // 在此处直接接收传递过来的图片,存放到指定的目录当中
    /**
     * 1. 使用req.file来接收上传过来的图片
     * 2. 从临时路径当中读取图片信息
     * 3. 把读取到的数据存储到指定的目录当中
     *     目录要拼接成路径+图片名称的格式
     */
    // console.log(req.file);
    // res.end()
    // return;
    var {path:pathTmp,filename,originalname} = req.file
    var imgPath = path1.join(__dirname, '../uploads/') + filename + originalname;
    // 生成图片要存储的路径  这个路径包括图片名称
    fs.readFile(pathTmp,(err,data)=>{
      if(err) return res.json({
        "code":1,
        "msg": "读取失败"
      })

      fs.writeFile(imgPath,data,(err)=>{
        if(err) return res.json({
          "code":1,
          "msg":"上传失败"
        })
        // 还应该返回图片在服务器端的路径
        var src = "/uploads/" + filename + originalname;
        res.json({  
          "code":0,
          "msg":"上传成功",
          "src":src
        })
      })
    })
  },
  updateProfileInfoById(req,res){
    // 写业务逻辑 
    // 接收传递过来的更新后的数据,调用model层的方法
    var profileInfo = req.body;
    console.log(profileInfo);
    usersModel.updateProfileInfoById(profileInfo,(err,isOK)=>{
      if(err) return res.json({
        "code":1,
        "msg":"更新失败"
      })

      res.json({
        "code":0,
        "msg":"更新成功"
      })
    })
  }
}