import { z } from 'zod'
import { isDateValid, isTimeValidExact } from '../utils/date'
import { Duration } from '../enums'


export const reservationSchema = z.object({
  canchaId: z.number({ required_error: 'Cancha is required', invalid_type_error: 'Invalid Cancha' }),
  userId: z.number({ required_error: 'User is required', invalid_type_error: 'Invalid User' }),
  date: z
    .string({ required_error: 'Date is required' })
    .refine((date) => isDateValid(date), { message: 'Invalid Date' }),
  time: z
    .string({ invalid_type_error: 'Invalid Time', required_error: 'Time is required' })
    .refine((time) => isTimeValidExact(time), { message: 'Invalid Time' }),
  duration: z
    .number({ required_error: 'Duration is required', invalid_type_error: 'Invalid Duration' })
    .refine((duracion) => Object.values(Duration).includes(duracion), { message: 'Invalid Duration' }),
  status: z
    .enum(['pending', 'confirmed', 'cancelled'], {
      required_error: 'Status is required',
      invalid_type_error: 'Invalid Status',
    })
    .optional(),
})
