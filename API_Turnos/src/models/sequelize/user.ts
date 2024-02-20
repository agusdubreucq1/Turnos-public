import { sequelize } from './conection'
import { DataTypes} from 'sequelize'
import bcrypt from 'bcrypt'
import { User, UserModel} from '../../types'

const User = sequelize.define<UserModel>('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
  }
})

User.beforeSave(async (user) => {
  const { password } = user
  user.password = await bcrypt.hash(password, 10)
})

export default User
