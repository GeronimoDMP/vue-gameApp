// 创建物品模型
const mongoose = require('mongoose')
// 数据表存储的模型
const schema = new mongoose.Schema({
    // 数据条目的name（分类模型的字段name）
    name: { type: String },
    icon: { type: String },
    
})
// 导出名为Category的mongoose数据表模型
module.exports = mongoose.model('Item', schema)