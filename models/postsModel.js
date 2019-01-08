// 1. 引入模块
var conn = require('./baseDb.js')

// 2. 向外导出或是暴露对象
module.exports = {
  addNewPost(post,callback){ // 添加新文章
    var sql = "insert into posts set ?"
    conn.query(sql,[post],(err,result)=>{
      if(err) return callback(err)

      callback(null,true)
    })
  },
  getPostsData(callback){ // 获取第一页的数据
    // var sql = "select * from posts";
    // var sql = "select * from posts order by id desc limit 10"; // 只查询前10条,以倒序排列完毕后
    // var sql = "select * from posts order by id desc limit 10;select count(*) as count from posts"; // 只查询前10条,以倒序排列完毕后
    var sql = "SELECT p.id,p.title,p.created,p.status,u.nickname,c.name from posts as p left join users as u on p.user_id=u.id left join categories as c  on  p.category_id = c.id order by p.id desc limit 10;select count(*) as count from posts"; // 只查询前10条,以倒序排列完毕后
    conn.query(sql,(err,result)=>{
      // console.log(err.message);
      if(err) return callback(err)
      // console.log(result);
      callback(null,result); // result是查询到的所有的文章,是放在数组里面
    })
  },
  getPostsDataByPage(page,callback){ // 根据页码进行联表查询并返回数据
    var pageSize = 10; // 规定每页显示的文章条数
    var offset = (page - 1) * pageSize;
    // var sql = "select * from posts order by id limit offset,pageSize"
    // var sql = "select * from posts order by id desc limit ?,?"
    var sql = "select p.id,p.title,p.created,p.status,u.nickname,c.name from posts as p left join users as u on p.user_id = u.id left join categories as c on p.category_id = c.id order by p.id desc limit ?,?"
    conn.query(sql,[offset,pageSize],(err,result)=>{
      if(err) return callback(err)

      callback(null,result)
    })
  },
  delPostsById(id,callback){ // 根据id来删除文章
    var sql = "delete from posts where id = ?"
    conn.query(sql,[id],(err,result)=>{
      if(err) return callback(err)

      callback(null,true)
    })
  }, 
  getPostsInfoById(id,callback){
    var sql = "select * from posts where id = ?;select * from categories"
    conn.query(sql,[id],(err,result)=>{
      if(err) return callback(err)
      // console.log(result);
      // callback(null,result[0]) ;// 将查询出来的数据从数组中取出来传递给控制器层
      callback(null,result) ;// 将查询出来的数据从数组中取出来传递给控制器层
    })
  },
  updatePostsInfoById(post,callback){
    var {id} = post
    var sql = "update posts set ? where id = ?"
    conn.query(sql,[post,id],(err,result)=>{
      if(err) return callback(err)

      callback(null,true)
    })
  }
}

// "select * from posts"
// "select value from options where key = 'nav_menus'"