import { DataTypes, Model } from 'sequelize'
import { sequelize } from './conection'

type CanchasModel = Model & {
    id: number
    name: string
    descripcion: string
}

export const Canchas = sequelize.define<CanchasModel>('canchas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  descripcion: {
    type: DataTypes.STRING,
  }
})
