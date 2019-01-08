// 1. 引入模块
var conn = require('./baseDb.js')

// 2. 向外导出或是暴露对象
module.exports = {
  getCommentsData(callback){
    // var sql = "select * from comments"
    var sql = "select c.id,c.author,c.created,c.status,c.content,p.title from comments as c left join posts as p on c.post_id=p.id order by c.id limit 10;select count(*) as totalCount from comments"
    conn.query(sql,(err,result)=>{
      if(err) return callback(err)
      // console.log(result);
      callback(null,result)
    })
  },
  getCommentsDataByPage(page,callback){
    var pageSize = 10 ;// 每页显示的条数
    var offset = (page-1)*pageSize
    var sql = "select c.id,c.author,c.created,c.content,c.status,p.title from comments as c left join posts as p on c.post_id=p.id order by c.id limit ? , ?"
    conn.query(sql,[offset,pageSize],(err,result)=>{
      if(err) return callback(err)

      callback(null,result)
    })
  },
  delCommentsInfoById(id,callback){
    var sql = "delete from comments where id = ?"
    conn.query(sql,[id],(err,result)=>{
      if(err) return callback(err)
      callback(null,true)
    })
  },
  updateCommentsStatusById(id,callback){
    var sql = "update comments set status ='approved' where id = ?"
    conn.query(sql,[id],(err,result)=>{
      if(err) return callback(err)

      callback(null,true)
    })
  }
}