const service = require('../service/user.service')

class UserController {
  // 创建用户
  async create(ctx, next) {
    // 获取用户请求传递的参数
    const userInfo = ctx.request.body
    // 查询数据
    const result = await service.create(userInfo)
    // 返回数据
    ctx.body = result
  }

  // 根据关键字查询用户
  async search(ctx, next) {
    // 获取用户请求传递的参数
    const requestUserId = ctx.headers.requestUserId
    console.log(requestUserId)
    const value = ctx.query.value
    // 查询数据
    const result = await service.searchUser(requestUserId, value)
    // console.log(result)
    // 返回数据
    ctx.body = result
  }

  // 根据关键字查询用户
  async getUserInfo(ctx, next) {
    // 获取用户请求传递的参数
    const userId = ctx.params.id
    // 查询数据
    const result = await service.getUserInfo(userId)
    // console.log(result)
    // 返回数据
    ctx.body = result[0] || '暂无用户信息'
  }

  // 更新用户信息
  async updateUserInfo(ctx, next) {
    // 获取用户请求传递的参数
    const userInfo = ctx.request.body
    // 查询数据
    const result = await service.updateUserInfo(userInfo)
    // console.log(result)
    // 返回数据
    ctx.body = result[0] || '暂无用户信息'
  }
}

module.exports = new UserController()
