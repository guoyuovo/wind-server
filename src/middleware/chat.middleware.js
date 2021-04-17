const {socketObj, io} = require('../app/socket')
const verifyChat = async (ctx, next) => {
  // 1.获取传递来的信息
  const {fromId, toId, message, type} = ctx.request.body
  // 2.判断信息不能为空
  if (!fromId || !toId || !message || !type) {
    const error = new Error('')
    return ctx.app.emit('error', error, ctx)
  }
  await next()
}

const emitNewChat = async (ctx, next) => {
  // 1.获取发送人和接收人
  const {fromId,toId} = ctx.request.body
  // 2.如果被添加用户处于连接状态 发送事件
  socketObj[fromId] && socketObj[fromId].socket.emit('newChat')
  socketObj[toId] && socketObj[toId].socket.emit('newChat')
}

module.exports = {
  verifyChat,
  emitNewChat
}
