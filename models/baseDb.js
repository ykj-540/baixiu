// 1. 引入mysql模块
var mysql = require('mysql')

// 2. 创建连接对象
var conn = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'gzbaixiu',
  multipleStatements:true // 启用多条SQL语句的查询
})

// 3. 连接
conn.connect(); // 连接数据库

module.exports = conn

/**
 * 设计数据库的时候，一般的原则，是同类事物要放一张表中，更加的方便管理和维护 
 * 学生   stu
 * 班级   class
 * 
 */