const connection = require('../app/database')

class FriendService {
  // 查询关系是否存在
  async getRelationBySortedKey(sortedKey) {
    // 查询数据
    const statement = `SELECT * FROM user_friend WHERE sortedKey = ?;`
    const result = await connection.execute(statement, [sortedKey])
    // console.log(result[0])
    return result
  }

  // 建立好友关系
  async buildRelation(relationInfo) {
    // 获取用户ID 好友ID 申请信息
    const {userId, friendId, authMessage} = relationInfo
    const sortedKey = userId > friendId ? `${friendId}-${userId}` : `${userId}-${friendId}`
    // 新增数据
    const statement = `INSERT INTO user_friend ( userId, friendId,sortedKey,authMessage ) VALUES (?,?,?,?);`
    const result = await connection.execute(statement, [userId, friendId, sortedKey, authMessage])
    // console.log(result[0])
    return result
  }

  // 获取该用户被申请好友的记录
  async getFriendApply(friendId) {
    // 查询数据
    const statement = `SELECT * FROM user_friend WHERE friendId = ?;`
    const result = await connection.execute(statement, [friendId])
    let applyList = result[0]
    if (applyList.length > 0) {
      const userIdList = applyList.map(item => {
        return item.userId
      })
      // 查询所有申请人信息
      const statement = `SELECT * FROM user WHERE id in (?);`
      const result2 = await connection.query(statement, [userIdList])
      const userList = result2[0]
      // console.log(userList)
      for (let i = 0; i < userList.length; i++) {
        applyList.forEach(element => {
          if (element.userId === userList[i].id) {
            element.user = userList[i]
          }
        })
      }
    }
    return applyList
  }

  // 更新好友关系状态
  async updateRelationStatus(id) {
    // 更新数据
    const statement = `UPDATE user_friend SET status = REPLACE(status,0,1) WHERE id = ?;`
    const result = await connection.execute(statement, [id])
    // console.log(result[0])
    return result[0]
  }


// 创建第一条聊天记录
  async createFirstChat(applyUserId, friendId) {
    // 创建第一条聊天记录
    const statement = `INSERT INTO user_chat ( fromId, toId, message, type) VALUES (?,?,?,?);`
    const result = await connection.execute(statement, [friendId, applyUserId, '我通过了你的好友验证请求，现在我们可以开始聊天了', 1])
    return result
  }

  // 获取好友列表
  async getFriend(id) {
    // 更新数据
    const statement = `SELECT friendId as userId FROM user_friend WHERE userId = ? And status = 1
UNION
SELECT userId FROM user_friend WHERE friendId = ? And status = 1;`
    const result = await connection.execute(statement, [id, id])
    const friendIdList = result[0]
    // console.log(friendIdList)
    if (friendIdList.length > 0) {
      const userIdList = friendIdList.map(item => {
        return item.userId
      })
      // 查询好友详细信息
      const statement = `SELECT * FROM user WHERE id in (?);`
      const result2 = await connection.query(statement, [userIdList])
      // console.log(result2[0])
      return result2[0]
    }
    return result[0]
  }
}

module.exports = new FriendService()
