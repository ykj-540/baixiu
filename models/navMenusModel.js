// 1. 引入模块
var conn = require('./baseDb.js')

// 2. 向外导出或是暴露对象
module.exports = {
  getNavMenusData(callback){
    var sql = "select `value` from options where `key`='nav_menus'";
    conn.query(sql,(err,result)=>{
      if(err) return callback(err)
      // console.log(result);
      // 需要将查询出来的数据转换成数组,再传入到函数当中
      callback(null, JSON.parse(result[0]['value']))
    })
  },
  addNewNavMenus(navInfo,callback){ // 添加导航项
    /**
     * 1. 先读取原来的数据,因为那些数据都放在value里面
     * 2. 将读出来的数据转换成数组对象
     * 3. 给这个数组添加传递过来的数据
     */
    this.getNavMenusData((err,result)=>{
      // console.log(err.message);
      if(err) return callback(err)
      console.log(result);
      var arr = result;
      arr.push(navInfo)
      var str = JSON.stringify(arr)
      console.log(str);
      // var sql = "update options set `value` = "+str+" where `key`='nav_menus'";
    var sql = "update options set `value` = '"+str+"' where `key`='nav_menus'"; 
      conn.query(sql,(err,result)=>{
        if(err) return callback(err)

        callback(null, arr) // 将数据库中最新的数据再返回到前端页面中
      })
    })
  },
  delNavMenusByIndex(index,callback){ // 删除导航项
    this.getNavMenusData((err,result)=>{
      if(err) return callback(err)
      var arr = result;
      // 根据索引删除那一项
      arr.splice(index,1);
      var str = JSON.stringify(arr)
      var sql = "update options set `value` = '" + str + "' where `key`='nav_menus'"; 
      conn.query(sql,(err,result)=>{
        if(err) return callback(err)

        callback(null,arr)
      })
    })
  },
  updateDataByParams(str){

  }
}