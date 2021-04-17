const connection = require('../app/database')

class UserService {
	// 添加用户
	async create(userInfo) {
		const {username, email, password} = userInfo
		const statement = `INSERT INTO user ( username, email, PASSWORD ) VALUES (?,?,?);`
		const result = await connection.execute(statement, [username, email, password])
		// 将用户数据保存到数据库中
		return result[0]
	}

	// 判断用户是否存在
	async getUserByEmail(email) {
		const statement = `SELECT * FROM user WHERE email = ?;`
		const result = await connection.execute(statement, [email])
		return result[0]
	}

	// 查询用户列表
	async searchUser(requestUserId, value) {
		const statement = `SELECT * FROM user WHERE CONCAT(username,email) LIKE '%${value}%';`
		const result = await connection.execute(statement, [value])
		let userList = result[0]
		// 判断搜索列表中的好友关系
		for (let i = 0; i < userList.length; i++) {
			const sortedKey = requestUserId > userList[i].id ? `${userList[i].id}-${requestUserId}` : `${requestUserId}-${userList[i].id}`
			const statement = `SELECT * FROM user_friend WHERE sortedKey = ?;`
			const result = await connection.execute(statement, [sortedKey])
			console.log(result[0])
			if (result[0].length === 0) {
				userList[i].isFriend = false
			} else {
				userList[i].isFriend = result[0][0].status === 1
			}
		}
		// 去除自己
		userList = userList.filter(user => user.id !== requestUserId)
		return userList
	}

	// 获取用户信息
	async getUserInfo(userId) {
		const statement = `SELECT * FROM user WHERE id = ?;`
		const result = await connection.execute(statement, [userId])
		return result[0]
	}

	// 更新用户信息
	async updateUserInfo(userInfo) {
		const {avatar, signature, username, gender, birthday, phone, email, password, id} = userInfo
		const statement = `UPDATE user SET avatar = ?,signature = ?,username = ?,gender = ?,birthday = ?,phone = ?,email = ?,password = ?  WHERE id = ?;`
		const result = await connection.execute(statement, [avatar, signature, username, gender, birthday, phone, email, password, id])
		return result
	}
}

module.exports = new UserService()
