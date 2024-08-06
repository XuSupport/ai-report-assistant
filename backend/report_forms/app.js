const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser');
//express-jwt 解析token的中间件 将jwt字符串解析还原成json对象
const expressJWT = require('express-jwt')
const joi = require('joi')
const userRouter = require('./router/user')
const userinfoRouter = require('./router/userinfo')
const config = require('./config')
const db = require('./db/db')

const app = express()

app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }))
//静态资源路径
app.use('/images', express.static(__dirname + '/images'))
app.use((req, res, next) => {
    res.cc = function (err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})
//以/api开头的不需要身份认证
//request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization") 在swiftUI中的写法
app.use(expressJWT({secret: config.jwtSecretKey}).unless({path: [/^\/api\//]}))
app.use('/api', userRouter)
app.use('/my', userinfoRouter)

//错误处理中间件
app.use((err, req, res, next) => {
    //验证不通过导致的错误
    if (err instanceof joi.ValidationError) return res.cc(`验证失败:${err}`)
    //捕获身份认证失败的错误 处理token解析失败（如过期）导致的错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
    //处理其他错误
    res.cc(err)
})

app.listen(3000, '0.0.0.0', () => {
    console.log('服务器已经启动...')
})
