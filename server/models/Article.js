// 创建物品模型
const mongoose = require('mongoose')
// 数据表存储的模型
const schema = new mongoose.Schema({
    // 数据条目的name（分类模型的字段name）
    title: { type: String },
     // 多选属性要包个数组
    parent: [{type: mongoose.SchemaTypes.ObjectId,ref:'Category'}],
    body: { type: String },
},{
    // 录入数据时自动带有创建和更新两个时间戳
    timestamps:true
})
// 导出名为Category的mongoose数据表模型
module.exports = mongoose.model('Article', schema)