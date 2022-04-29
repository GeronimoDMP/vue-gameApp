// 后端路由:通用的增删改查接口,不同模型的请求url都由app路由前缀匹配并接收模型名
module.exports = app => {
    // 创建路由对象
    const express = require('express')
    // 处理判断条件扔出异常的模块
    const assert = require('http-assert')
    const router = express.Router({
        // app的url合并到router里,router才能访问到req.params.resource
        mergeParams: true
    })
    const jwt = require('jsonwebtoken')
    // 引入AdminUser模型
    const AdminUser = require(`../../models/AdminUser`)

    // 创建分类的新建数据请求
    router.post('/', async (req, res) => {
        // 模型的create方法创建数据，存入数据库，来源为请求体
        const model = await req.Model.create(req.body)
        // 向admin发送数据
        res.send(model)
    })

    // put修改原数据
    router.put('/:id', async (req, res) => {
        // 通过传来的id找到要修改的条目，将新数据(即req.body)替换上去
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        // 向admin发送数据
        res.send(model)
    })

    // delete删除条目
    router.delete('/:id', async (req, res) => {
        // 通过传来的id找到要删除的条目，将数据(即req.body)删除
        await req.Model.findByIdAndDelete(req.params.id, req.body)
        // 向admin发送数据
        res.send({
            success: true
        })
    })

    // 显示分类的请求，含中间件检验用户token
    router.get('/', async (req, res, next) => {
        // 从请求头拿到token
        const token = String(req.headers.authorization).split(" ")[1]
        assert(token,401,'请先登录')
        // 从token里解出一个对象，其中有id
        const id = jwt.verify(token, app.get('secret')).id
        assert(token,401,'请先登录')
        // 根据该id找到数据库里对应用户并挂载到req上
        req.user = await AdminUser.findById(id)
        assert(req.user,401,'请先登录')
        next()
    },
        async (req, res) => {
            if (req.Model.modelName === 'Category' || req.Model.modelName === 'Article') {
                // 当模型为Category时才关联上级分类
                // queryOptions.populate='parent'  setOptions(queryOptions)
                const items = await req.Model.find().populate('parent').limit(100)
                res.send(items)
            } else {
                // 模型的find方法获取数据，限制10条，发给前端
                // parent字段通过其ref属性,关联parent中保存的id对应的对象
                const items = await req.Model.find().limit(100)
                res.send(items)
            }
            // 向admin发送数据

        })

    // 编辑时输入框显示原条目的请求
    router.get('/:id', async (req, res) => {
        // 模型的findById方法根据请求url带的id获取数据，发给前端
        const model = await req.Model.findById(req.params.id)
        // 向admin发送数据
        res.send(model)
    })


    //路径前缀接收模型路径，接收各个模型的请求,加入一个中间件处理模型名
    app.use('/admin/api/rest/:resource' ,async (req, res, next) => {
        // inflection包将请求路径(如categories)转换为文件名(如Category),才可以引入该文件  
        const modelName = require('inflection').classify(req.params.resource)
        // 动态引入数据模型挂载到req上,否则后续访问不到
        req.Model = require(`../../models/${modelName}`)
        next()
    }, router)

    // 图片处理
    // 点击上传后自动带着文件数据向/admin/api/upload发请求,
    // 服务器接收该数据,加上拼出的图片地址,再将其返回客户端
    const multer = require('multer')
    // upload:上传中间件函数 dest:要传到的地址
    const upload = multer({ dest: __dirname + '/../../uploads' })
    // 上传图片请求.单文件,file:点击上传后接收到的文件
    app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
        // upload执行后会在req上挂载file,值为上传的数据
        req.file.url = `http://localhost:3000/uploads/${req.file.filename}`
        res.send(req.file)
    })

    // 登录
    app.post('/admin/api/login', async (req, res) => {
        // const {username,password}=req.body
        //    根据用户名是否有匹配的传入对象的用户名来寻找用户,并设置password可获取
        const user = await AdminUser.findOne({ username: req.body.username }).select('+password')
        // 条件为false抛出错误
        assert(user,422,'用户不存在')
        // if (!user) {
        //     res.status(422).send({
        //         message: '用户不存在'
        //     })
        // }
        //    查询到用户存在，校验密码(传来的密码，数据库中用户的密码)
        const isValid = require('bcrypt').compareSync(req.body.password, user.password)
        assert(isValid,422,'密码错误')
        //  返回token
        //  用用户的id生成token,密钥：获取app身上的配置
        const token = jwt.sign({ id: user._id }, app.get('secret'))
        res.send(token)
    })

    // assert不发送json形式错误，需要错误级别中间件接收错误
    app.use(async(err,req,res,next)=>{
        res.status(err.status).send({
            message: err.message
        })
    })
}