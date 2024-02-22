import { SheduleDefault } from '../sequelize/shedulesDefault'

export const SheduleDefaultModel = {
  getTimes: async () => {
    const shedules = await SheduleDefault.findOne({})
    return [shedules?.horarioInicio.slice(0, 5), shedules?.horarioFin.slice(0, 5)]
  },
}
