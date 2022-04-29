// 创建模型
const mongoose = require('mongoose')
// 数据表存储的模型
const schema = new mongoose.Schema({
   // 数据条目的name（分类模型的字段name）
   username: { type: String },
   password: {
      type: String,
      // 密码不被获取，只可存入，防止编辑时已散列密码再次散列
      select: false,
      //  set为保存前进行的处理，val为传入的原密码
      set(val) {
         //  加密
         return require('bcrypt').hashSync(val, 10)
      }
   }
})
// 导出名为Category的mongoose数据表模型
module.exports = mongoose.model('AdminUser', schema)