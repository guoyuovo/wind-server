const service = require('../service/friend.service')

class FriendController {
  // 添加好友关系
  async buildRelation(ctx, next) {
    // 获取用户请求传递的参数
    const relationInfo = ctx.request.body
    // 查询数据
    const result = await service.buildRelation(relationInfo)
    // 返回数据
    ctx.body = result[0]
    await next()
  }

  // 获取被添加好友申请记录
  async getFriendApply(ctx, next) {
    // 获取用户请求传递的参数
    const friendId = ctx.headers.requestUserId
    // 查询数据
    const result = await service.getFriendApply(friendId)
    // 返回数据
    ctx.body = result
  }

  // 更新好友状态
  async updateRelationStatus(ctx, next) {
    // 获取数据id
    const {id, applyUserId, friendId} = ctx.request.body
    // 查询数据
    const result = await service.updateRelationStatus(id)
    const result2 = await service.createFirstChat(applyUserId, friendId)
    // 返回数据
    ctx.body = result2
    await next()
  }

  // 获取好友列表
  async getFriend(ctx, next) {
    // 获取用户id
    const id = ctx.headers.requestUserId
    // 查询数据
    const result = await service.getFriend(id)
    // 返回数据
    ctx.body = result
  }
}

module.exports = new FriendController()
