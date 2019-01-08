// 1. 引入模块
var conn = require('./baseDb.js')

// 2. 向外导出或是暴露对象
module.exports = {
  getAllCategoriesInfo(callback){ // 获取所有分类信息
    var sql = "select * from categories";
    conn.query(sql,(err,result)=>{
      if(err) return callback(err)
      // console.log(result);
      // result是查询出来的所有的分类,是放在数组当中
      callback(null,result);// 将真正的数据返回给控制器层
    })
  },
  addCategorieInfo(categories,callback){ // 添加新分类
    // 准备sql语句,添加数据
    var sql = "insert into categories set ?";
    conn.query(sql, [categories],(err,result)=>{
      if(err) return callback(err)

      callback(null,true);// 返回添加后的状态
    })
  },
  delCategoriesInfoById(id,callback){ // 根据id删除分类信息
    var sql = "delete from categories where id = ?"
    conn.query(sql,[id],(err,result)=>{
      if(err) callback(err)

      callback(null,true)
    })
  },
  getCategoriesInfoById(id,callback){ // 根据id查询一条分类信息
    var sql = "select * from categories where id = ?"
    var f1 = (err, result) => {
      if (err) return callback(err)
      console.log(result);
      callback(null, result)
    }
    conn.query(sql,[id],f1)
  },
  updateCategoriesInfoById(categoriesInfo,callback){ // 根据id更新分类
    var sql = "update categories set ? where id = ?"
    conn.query(sql,[categoriesInfo,categoriesInfo.id],(err,result)=>{
      if(err) return  callback(err)

      callback(null,true)
    })
  },
  delMoreCategoriesInfoByIds(ids,callback){ // 根据id批量删除分类
    var sql = "delete from categories where id in (?)"
    conn.query(sql,[ids],(err,result)=>{
      if(err) return callback(err)
      callback(null,true)
    })
  }
}