const errorTypes = require('../constants/error-types')
const service = require('../service/auth.service')
const verifyLogin = async (ctx, next) => {
  // 1.获取邮箱、密码
  const {email, password} = ctx.request.body
  // 2.判断邮箱、密码不能为空
  if (!email || !password) {
    const error = new Error(errorTypes.EMAIL_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }
  // 判断用户是否存在
  const result = await service.getUserByEmail(email)
  const user = result[0]
  if (!user) {
    const error = new Error(errorTypes.USER_DOES_NOT_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }
  await next()
}

module.exports = {
  verifyLogin
}
