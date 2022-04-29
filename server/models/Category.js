// 创建分类模型
const mongoose = require('mongoose')
// 数据表存储的模型
const schema = new mongoose.Schema({
    // 数据条目的name（分类模型的字段name）
    name: { type: String },
    // 数据条目的parent（分类模型的字段parent）,类型为数据库里的id
    parent: {
        type: mongoose.SchemaTypes.ObjectId,
        // ref关联该数据表：通过父级id(即parent字段保存的数据)可在表里找到该父级
        ref:'Category'
    }
})

schema.virtual('children',{
    localField:'_id',
    foreignField:'parent',
    justOne:false,
    ref:'Category'
})
schema.virtual('newsList',{
    localField:'_id',
    foreignField:'parent',
    justOne:false,
    ref:'Article'
})
// 导出名为Category的mongoose数据表模型
module.exports = mongoose.model('Category', schema)