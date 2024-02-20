import User from '../sequelize/user'
import { UserWithoutId } from '../../types'

export const UserModel = {
  async createUser(newUser: UserWithoutId) {
    return await User.create(newUser)
  },

  async getAllUsers() {
    return await User.findAll()
  },

  async getUserById(id: number) {
    return await User.findByPk(id)
  },

  async getUserByEmail(email: string) {
    return await User.findOne({ where: { email } })
  },

  async deleteAllUsers() {
    return await User.destroy({ where: {}, truncate: true })
  }
}
