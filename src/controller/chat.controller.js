const service = require('../service/chat.service')
const compare = require('../utils/compare')

class chatController {
  // 新增聊天记录
  async createChat(ctx, next) {
    // 获取用户请求传递的参数
    const chatInfo = ctx.request.body
    // 查询数据
    const result = await service.createChat(chatInfo)
    // 返回数据
    ctx.body = result[0]
    await next()
  }

  // 获取用户的聊天记录
  async getUserChat(ctx, next) {
    // 获取用户id
    const userId = ctx.params.id
    // 查询数据
    const result = await service.getUserChat(userId)
    // 按照id进行排序
    result[0].sort(compare('id'))
    // 返回数据
    ctx.body = result[0]
  }

}

module.exports = new chatController()
