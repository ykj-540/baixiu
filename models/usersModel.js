// 1. 引入模块
var conn = require('./baseDb.js')

// 4. 调用方法查询数据
module.exports = {
  getAllUsers(callback){ // 获取所有用户信息
    var sql = "select * from users";
    conn.query(sql,(err,result)=>{
      if(err) return callback(err);

      callback(null,result);
    })
  },
  userAdd(user,callback){ // 添加新用户
    var sql = "insert into users set ?"
    conn.query(sql,user,(err,result)=>{
      if(err) return callback(err) 
        callback(null,true)
    })
  },
  userDel(id,callback){ // 删除用户
    /**
     * 1. 准备SQL语句
     * 2. 调用方法删除数据
     * 3. 返回结果
     */
    var sql = "delete from users where id = ?"
    conn.query(sql,id,(err,result)=>{
      if(err) return callback(err)

      callback(null,true)
    })
  },
  showUserInfoById(id,callback){ // 显示用户信息
    var sql = "select * from users where id = ?"
    //  调用方法查询数据
    conn.query(sql,id,(err,result)=>{
      if(err) return callback(err)

      callback(null,result)
    })
  },
  updateUserInfoById(user,callback){ // 更新用户信息
    // 准备sql语句更新数据
    var sql = "update users set ? where id = ?"
    conn.query(sql,[user,user.id],(err,result)=>{
      if(err) return callback(err);// 将错误返回给控制器
      callback(null,true)
    })
  },
  delMoreUsersByIds(ids,callback){ // 批量删除用户
    // 接收传递过来的数据,根据id批量的删除数据
    var sql = "delete from users where id in (?)"
    console.log(ids);
    conn.query(sql,[ids],(err,result)=>{
      if(err) return callback(err)

      callback(null,true)
    })
  },
  userloginByEmailAndPassword(user,callback){ // 根据邮箱和密码登陆
    var sql = "select * from users where email =? and password=?"
    var { email, password:pass}  = user
    // conn.query(sql,[user.email,user.password],(err,result)=>{
    conn.query(sql,[email,pass],(err,result)=>{
      if(err) return  callback(err)
      if(result.length==0) return callback(false)
      // console.log(result);
      // callback(null,true)
      callback(null,result[0])
    })
  },
  getProfileInfoById(id,callback){ // 获取个人中心数据
    var sql = "select * from users where id = ?"
    conn.query(sql,[id],(err,result)=>{
      if(err) return callback(err)
      callback(null,result[0])
    })
  },
  updateProfileInfoById(profileInfo,callback){ // 更新个人中心数据
    var {id} = profileInfo;
    var sql = "update users set ? where id = ?"
    conn.query(sql,[profileInfo,id],(err,result)=>{
      if(err) return callback(err)

      callback(null,true)
    })
  }
}