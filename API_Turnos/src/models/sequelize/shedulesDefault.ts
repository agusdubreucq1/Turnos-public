import { DataTypes} from 'sequelize'
import { sequelize } from './conection'
import { SheduleDefaultModel } from '../../types'



export const SheduleDefault = sequelize.define<SheduleDefaultModel>('shedulesDefault', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  horarioInicio: {
    type: DataTypes.TIME,
  },
  horarioFin: {
    type: DataTypes.TIME,
  }
})
