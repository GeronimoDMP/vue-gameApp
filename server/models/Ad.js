// 创建模型
const mongoose = require('mongoose')
// 数据表存储的模型
const schema = new mongoose.Schema({
    // 数据条目的name（分类模型的字段name）
    name: { type: String },
     // items为一个广告位数组，广告位里有多个广告对象，每个广告对象有图片和链接
    //  用数组包住是为了循环展示到页面上
     items:[{
        img:{type: String},
        url:{type: String},
     }]
})
// 导出名为Category的mongoose数据表模型
module.exports = mongoose.model('Ad', schema)