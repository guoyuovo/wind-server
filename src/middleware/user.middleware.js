const errorTypes = require('../constants/error-types')
const service = require('../service/user.service')
const md5password = require('../utils/password-handle')
const verifyUser = async (ctx, next) => {
  // 1.获取用户名、邮箱、密码
  const {username, email, password} = ctx.request.body
  // 2.判断用户名、邮箱、密码不能为空
  if (!username || !email || !password) {
    const error = new Error(errorTypes.USERNAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }
  // 3.判断邮箱没有被注册过
  const result = await service.getUserByEmail(email)
  // console.log(result)
  if (result.length) {
    const error = new Error(errorTypes.USER_ALREADY_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }
  await next()
}

// md5加密密码
const handlePassword = async (ctx, next) => {
  const {password} = ctx.request.body
  ctx.request.body.password = md5password(password)
  await next()
}

module.exports = {
  verifyUser,
  handlePassword
}
