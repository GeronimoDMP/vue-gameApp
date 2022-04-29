// 客户端路由组件
module.exports = app => {
    const router = require('express').Router()
    const mongoose = require('mongoose')
    const Article = require('../../models/Article')
    const Hero = require('../../models/Hero')
    const Category = require('../../models/Category')

    // 偷懒导入新闻
    router.get('/news/init', async (req, res) => {
        const parent = await Category.findOne({
            name: '新闻资讯'
        })
        const cats = await Category.find().where({
            parent: parent
        }).lean()
        const newsTitles = ['五五朋友节主题头像框方案票选结果公布', '叮！新赛季攻略解读报告出炉', '互动小任务第16期-五五朋友节主题头像框票选活动开启！', '最新BUG修复进展【老亚瑟的答疑时间】', '王者改娃达人言吾豪I 《营地·人物》', '4月28日全服不停机更新公告', '4月28日体验服不停机更新公告', '4月28日全服不停机更新公告', '4月28日英雄平衡性调整丨扁鹊、金蝉增强，夏洛特、老夫子降温', '4月26日体验服停机更新公告', '【鸿运抽奖，抽六次送一次】活动开启公告', '等等我，马上到！五五朋友节福利来袭！', '匿光小队新皮肤登场！夏侯惇-匿光决锋者火热预定中', '五五朋友节主题头像框方案票选结果公布', '互动小任务第16期-五五朋友节主题头像框票选活动开启！', '站上赛场秀出高光，全国大赛游戏赛道第二期即将开启', 'KPL今日预报丨“狼星”BO7巅峰对决，谁能率先晋级总决赛？', '【简讯】XYG晋级败者组半决赛，西安WE遗憾淘汰', '【简讯】佛山GK晋级败者组半决赛，北京WB遗憾淘汰', '今日预报丨用实力闯出奇迹，北京WB、佛山GK谁能晋级四强？']
        const newsList = newsTitles.map(title => {
            const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
            return {
                categories: randomCats.slice(0, 2),
                title: title
            }
        })
        // await Article.deleteMany({})
        await Article.insertMany(newsList)
        res.send(newsList)
    })

    // 获取文章列表
    router.get('/news/list', async (req, res) => {
        // const parent=await Category.findOne({
        //     name:'新闻资讯'
        // }).populate({
        //     path:'children',
        //     populate:{
        //         path:'newsList'
        //     }
        // }).lean()
        const parent = await Category.findOne({
            name: '新闻分类'
        })
        const cats = await Category.aggregate([
            // 找到新闻资讯下的子分类
            { $match: { parent: parent._id } },
            // 以子分类为主体查他的集合,查出来以newsList为名放到子分类里面
            {
                $lookup: {
                    // 关联哪个表（集合）
                    from: 'articles',
                    localField: '_id',
                    foreignField: 'parent',
                    as:'newsList'
                }
            }
        ])
        // 每个文章加个CategoryName表示所在分类
        cats.map(cat=>{
            cat.newsList.map(news=>{
                news.CategoryName=cat.name
                return news
            })
            return cat
        })

        res.send(cats)
    })

   // 导入英雄数据
  router.get('/heroes/init', async (req, res) => {
    await Hero.deleteMany({})
    const rawData =[{"name":"法师","heros":[{"name":"干将莫邪","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/182/182.jpg"},{"name":"女娲","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/179/179.jpg"},{"name":"杨玉环","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg"},{"name":"弈星","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/197/197.jpg"},{"name":"米莱狄","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/504/504.jpg"},{"name":"司马懿","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg"},{"name":"沈梦溪","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/312/312.jpg"},{"name":"上官婉儿","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg"},{"name":"嫦娥","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg"},{"name":"西施","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/523/523.jpg"},{"name":"司空震","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/537/537.jpg"},{"name":"金蝉","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/540/540.jpg"}]},{"name":"刺客","heros":[{"name":"元歌","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/125/125.jpg"},{"name":"司马懿","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg"},{"name":"上官婉儿","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg"},{"name":"云中君","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg"},{"name":"马超","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/518/518.jpg"},{"name":"镜","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/531/531.jpg"},{"name":"澜","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/528/528.jpg"},{"name":"云缨","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/538/538.jpg"},{"name":"暃","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/542/542.jpg"}]},{"name":"射手","heros":[{"name":"成吉思汗","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/177/177.jpg"},{"name":"黄忠","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/192/192.jpg"},{"name":"百里守约","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg"},{"name":"公孙离","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/199/199.jpg"},{"name":"伽罗","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/508/508.jpg"},{"name":"蒙犽","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/524/524.jpg"},{"name":"艾琳","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/155/155.jpg"}]},{"name":"辅助","heros":[{"name":"明世隐","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/501/501.jpg"},{"name":"盾山","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/509/509.jpg"},{"name":"瑶","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/505/505.jpg"},{"name":"鲁班大师","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/525/525.jpg"},{"name":"金蝉","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/540/540.jpg"},{"name":"桑启","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/534/534.jpg"}]}]
    for (let cat of rawData) {
      if (cat.name === '热门') {
        continue
      }
      // 找到当前分类在数据库中对应的数据
      const category = await Category.findOne({
        name: cat.name
      })
      cat.heroes = cat.heroes.map(hero => {
        hero.categories = [category]
        return hero
      })
      // 录入英雄
      await Hero.insertMany(cat.heroes)
    }

    res.send(await Hero.find())
  })

 // 获取英雄列表
 router.get('/heroes/list', async (req, res) => {
    const parent = await Category.findOne({
        name: '英雄分类'
    })
    const cats = await Category.aggregate([
        // 找到新闻资讯下的子分类
        { $match: { parent: parent._id } },
        // 以子分类为主体查他的集合,查出来以newsList为名放到子分类里面
        {
            $lookup: {
                // 关联哪个表（集合）
                from: 'heroes',
                localField: '_id',
                foreignField: 'categories',
                as: 'heroList'
            }
        }
    ])


    res.send(cats)
})

// 文章详情
router.get('/articles/:id',async (req, res) => {
    res.send(await Article.findById(req.params.id))
})

// 英雄详情
router.get('/heros/:id',async (req, res) => {
    const data=await Hero
    .findById(req.params.id)
    .populate('categories').lean()
    res.send(data)
})

    app.use('/web/api', router)
}
