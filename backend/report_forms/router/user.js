const express = require('express')
const router = express.Router()
const user_handler = require('../router_handler/user')
const multer = require('multer')
const path = require('path')
//导入验证规则
const expressJoi = require('@escook/express-joi')
const schema = require('../schema/user')

// 设置图像存储的路径和文件名,当用户上传文件时，multer 使用这个配置对象来确定文件的存储位置和文件名
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //回调函数，告诉 multer 将文件保存到这个目录，静态资源路径
        cb(null, 'images/')
    },
    filename: function (req, file, cb) {
        //上传的文件名
        const uniqueFileName = Date.now() + '-' + Math.round(Math.random() * 1E9)
        //加上文件原本的后缀
        cb(null, uniqueFileName + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

//用于处理单个文件上传,'image' 参数指定了表单中文件上传字段的名称，中间件仅处理上传部分
router.post('/uploadImagePath', upload.single('image'), user_handler.uploadImagePath)
router.post('/regUser', upload.single('image'), expressJoi(schema.reg_login_schema), user_handler.regUser)
router.post('/login', expressJoi(schema.reg_login_schema), user_handler.login)

module.exports = router