// 1. 引入模块
var conn = require('./baseDb.js')

// 2. 向外导出或是暴露对象
module.exports = {
  getIndexPageData(callback){
    // var sql1 ="select count(*) as postsCount from posts; select count(*) as draftedCount from posts where status
    //  ='drafted' ";
    var sql = `select count(*) as postsCount from posts;
     select count(*) as draftedCount from posts where status ='drafted';
     select count(*) as categoriesCount from categories;
     select count(*) as commentsCount from comments;
     select count(*) as heldCount from comments;`

     conn.query(sql,(err,result)=>{
       if(err) return callback(err)
      //  console.log(result);
       callback(null,result)
     })
  }
}