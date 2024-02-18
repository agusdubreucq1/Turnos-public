import { Sequelize } from 'sequelize'
import { config } from 'dotenv'
config()

const {NODE_ENV, DB_PASSWORD_DEV ,DB_NAME_TEST, DB_NAME, DB_NAME_DEVELOMENT,  DB_PASSWORD_TEST, DB_HOST_DEV, DB_HOST_TEST, DB_USER_DEV, DB_USER_TEST, DB_USER, DB_PASSWORD, DB_HOST } = process.env

const dbName = NODE_ENV === 'test' ? DB_NAME_TEST : NODE_ENV === 'development' ? DB_NAME_DEVELOMENT : DB_NAME
const dbHost = NODE_ENV === 'test' ? DB_HOST_TEST : NODE_ENV === 'development' ? DB_HOST_DEV : DB_HOST
const dbPassword = NODE_ENV === 'test' ? DB_PASSWORD_TEST : NODE_ENV === 'development' ? DB_PASSWORD_DEV : DB_PASSWORD
const dbUser = NODE_ENV === 'test' ? DB_USER_TEST : NODE_ENV === 'development' ? DB_USER_DEV : DB_USER

export const sequelize = new Sequelize(
  dbName || '',
  dbUser || '',
  dbPassword || '',
  {
    host: dbHost || '',
    dialect: 'mysql',
    logging: false
  },
)
