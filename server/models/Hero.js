// 创建物品模型
const mongoose = require('mongoose')
// 数据表存储的模型
const schema = new mongoose.Schema({
    // 数据条目的name（分类模型的字段name）
    name: { type: String },
    avatar: { type: String },
    title: { type: String },
    categories: {type: mongoose.SchemaTypes.ObjectId,ref:'Category'},
    scores:{
        difficult:{type:Number},
        skills:{type:Number},
        attack:{type:Number},
        survive:{type:Number},
    },
    skills:[{
        icon:{type:String},
        name:{type:String},
        description:{type:String},
        tips:{type:String},
    }],
    // 多选属性要包个数组
    items1:[{ type: mongoose.SchemaTypes.ObjectId,ref:'Item'}],
    items2:[{ type: mongoose.SchemaTypes.ObjectId,ref:'Item'}],
    usageTips:{type:String},
    battleTips:{type:String},
    teamTips:{type:String},
    partners:[{
        hero:{type: mongoose.SchemaTypes.ObjectId,ref:'Hero'},
        description: { type: String },
    }]
})
// 导出名为Category的mongoose数据表模型
module.exports = mongoose.model('Hero', schema,'heroes')