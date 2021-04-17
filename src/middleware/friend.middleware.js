const errorTypes = require('../constants/error-types')
const service = require('../service/friend.service')
const {socketObj, io} = require('../app/socket')
const getRelation = async (ctx, next) => {
  // 1.获取用户ID 好友ID
  const {userId, friendId} = ctx.request.body
  // 2.用户ID，好友ID不能为空
  if (!userId || !friendId) {
    const error = new Error(errorTypes.USERID_OR_FRIEND_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }
  // 判断好友关系是否存在
  const sortedKey = userId > friendId ? `${friendId}-${userId}` : `${userId}-${friendId}`
  const result = await service.getRelationBySortedKey(sortedKey)
  const relation = result[0]
  if (relation.length > 0) {
    const error = new Error(errorTypes.FRIEND_RELATION_ALREADY_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }
  await next()
}

// 通知被添加用户有新的好友申请
const emitToFriend = async (ctx, next) => {
  // 1.获取被添加用户id
  const {friendId} = ctx.request.body
  // 2.如果被添加用户处于连接状态 发送事件
  socketObj[friendId] && socketObj[friendId].socket.emit('newNotice')
}

// 好友申请通过 通知申请人
const emitToUser = async (ctx, next) => {
  // 1.获取被添加用户id
  const {applyUserId, username} = ctx.request.body
  // 2.如果被添加用户处于连接状态 发送事件
  socketObj[applyUserId] && socketObj[applyUserId].socket.emit('applySuccess', {username})
}

module.exports = {
  getRelation,
  emitToFriend,
  emitToUser
}
