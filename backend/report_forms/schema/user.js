const joi = require('joi')

const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().required().pattern(/^[\S]{6,12}$/) //6 到 12 个非空白字符

//定义规则对象，这个对象会被传入expressJoi中间件的参数内
exports.reg_login_schema = {
    //表示需要对req.body中的数据进行验证
    body: {
        //body中的username属性要对应上述的username验证规则
        username: username,
        password: password
    },
}