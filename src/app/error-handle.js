const errorTypes = require('../constants/error-types')
const errorHandle = (error, ctx) => {
  console.log(error.message)
  let status
  let message
  switch (error.message) {
    case errorTypes.USERNAME_OR_PASSWORD_IS_REQUIRED:
      status = 400
      message = '用户名、邮箱、密码不能为空'
      break
    case errorTypes.EMAIL_OR_PASSWORD_IS_REQUIRED:
      status = 400
      message = '邮箱、密码不能为空'
      break
    case errorTypes.USER_ALREADY_EXISTS:
      status = 409
      message = '用户已经存在'
      break
    case errorTypes.USER_DOES_NOT_EXISTS:
      status = 400
      message = '用户不存在'
      break
    case errorTypes.USERID_OR_FRIEND_IS_REQUIRED:
      status = 400
      message = '非法请求'
      break
    case errorTypes.FRIEND_RELATION_ALREADY_EXISTS:
      status = 400
      message = '请勿重复添加'
      break
    default:
      status = 404
      message = 'NOT FOUND'
  }
  ctx.status = status
  ctx.body = message
}

module.exports = errorHandle
