import { Canchas } from '../sequelize/canchas'

export const CanchasModel = {
  getAll: () => {
    return Canchas.findAll()
  },
}
