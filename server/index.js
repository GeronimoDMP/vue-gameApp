// 服务器文件
const express=require('express')
const app=express()
// 为app添加一个secret属性，存放密钥
app.set('secret','123qweasd')
// 允许跨域请求
app.use(require('cors')())
// 解析JSON格式请求体数据，生成body属性挂载到req对象上
app.use(express.json())
// 托管uploads里的静态资源,使路由里面能通过/uploads路由前缀+文件名访问到
app.use('/uploads',express.static(__dirname+'/uploads'))
// 传入admin路由文件里的函数，并传入app对象运行
require('./routes/admin')(app)
// 传入数据库文件里的函数，并传入app对象运行
require('./plugins/db')(app)
require('./routes/web/index')(app)



app.listen(3000,()=>{
   console.log('running at 3000');
})