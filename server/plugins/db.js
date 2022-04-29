// 创建一个数据库并连接，以后admin发送的数据都会存入数据库
module.exports = app => {
    // 创建数据库对象
   const mongoose=require('mongoose')
   // 连接数据库,指定端口并命名数据库
   mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba',{
       useNewUrlParser:true
   })
}