/**
 * 搭建web服务器
 * Express + MVC + 数据库
 * 1. 项目文件夹里面新建app.js 作为项目的主入口文件
 * 2. 在app.js当中使用Express框架搭建web服务器
 * 3. 下载Experss ejs  mysql 
 *     3.1 npm init -y  执行快速初始化，创建package.json来管理下载的模块
 * 4. 创建路由文件夹routers 并创建路由模块
 * 5. 创建控制器文件夹controllers 并创建indexCtrl.js文件
 * 6. 托管静态资源文件
 *  一次性修改后缀文件: ren  *.html  *.ejs;    rename: 重命名
 */

// 1.引入模块
var express = require('express')
var indexRouter = require('./routers/indexRouter.js')
var usersRouter = require('./routers/usersRouter.js')
var categoriesRouter = require('./routers/categoriesRouter.js')
var postsRouter = require('./routers/postsRouter.js')
var commentsRouter = require('./routers/commentsRouter.js')
var navMenusRouter = require('./routers/navMenusRouter.js')
var bodyParser = require('body-parser')
var session = require('express-session')
var multer = require('multer')

// 2. 创建express实例对象
var app = express();

// 注册bodyParse中间件,用来接收POST过来的数据  extended:false 不需要额外的解析方式,可以直接使用node内置的数据解析方式,比如querystring.parse,同时可以使用req.body来获取POST提交过来的数据
app.use(bodyParser.urlencoded({ extended: false }))
// 设置模板引擎 
app.set('view engine', 'ejs');// 指定模板文件名称
app.set('views', './views');// 指定要渲染给浏览器的视图文件
app.use('/assets', express.static('assets'));// 设置托管的静态资源
app.use('/uploads', express.static('uploads'));// 设置托管的静态资源

app.use(session({   // 注册了中间件之后就意味着给req对象添加 了一个属性session  req.session
  secret: 'keyboard cat',  // 设置一个加密和随机串
  resave: false,   //  是否强制写入存储区
  saveUninitialized: false    // 第一次请求的时候，是否响应给sessionID
}))

// 注册处理文件或是图片的中间件multer
// app.use(multer({ dest: '/tmp/' }).single('avatar'))

// 3. 开启服务,并监听端口
app.listen(3000, () => {
  console.log('express server is running at http://127.0.0.1:3000');
})

// 4. 注册中间件
app.use(indexRouter);// 注册第一个路由中间件
app.use(usersRouter);// 注册用户路由中间件
app.use(categoriesRouter);// 注册分类路由中间件
app.use(postsRouter);// 注册文章路由中间件
app.use(commentsRouter);// 注册文章路由中间件
app.use(navMenusRouter);// 注册文章路由中间件

 /**
  * 隐藏域:
  * 1. 隐藏域的好处就是可以存储数据而不在页面中有结构的显示 
  * 
  * 模板：
  * 1. 使用模板渲染数据，相当于是动态的创建元素
  * 2. 对于模板里面元素的事件注册，一定要使用委托的方式来注册事件
  * 3. 也就是说一定要注册给原来不是模板渲染出来的标签,然后通过模板中的标签来触发
  * 4. 模板渲染出来的数据或是结构通过查看源代码看不到具体的样式,因为是在内存中生成的
  * 5. 可以使用审查元素的方式来查看具体结构样式 
  */