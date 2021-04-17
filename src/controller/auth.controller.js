const jwt = require('jsonwebtoken')
const service = require('../service/auth.service')
const {SECRET_KEY} = require('../app/config')

class authController {
  async login(ctx, next) {
    // 获取用户请求传递的参数
    const userInfo = ctx.request.body
    // 查询数据
    const result = await service.login(userInfo)
    // 返回数据
    const user = result[0][0]
    if (user && user.password === userInfo.password) {
      // 设置token
      user.token = jwt.sign({id: user.id}, SECRET_KEY, {
        expiresIn: 2592000
      })
      ctx.status = 200
      ctx.body = user
    } else {
      ctx.status = 401
      ctx.body = '用户名或密码错误'
    }
  }
}

module.exports = new authController()
