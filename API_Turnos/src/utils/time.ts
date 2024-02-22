import { Duration } from '../enums'
import { isTimeValidExact } from './date'

export const generateTimeArrayByRange = (start: string, end: string): string[] => {
  if (isTimeValidExact(start) === false || isTimeValidExact(end) === false) throw new Error('Invalid time')

  const [startHour, startMinute] = start.split(':')
  const [endHour, endMinute] = end.split(':')

  if (Number(startHour) > Number(endHour)) throw new Error('Invalid time')
  const currentTime = new Date(0, 0, 0, Number(startHour), Number(startMinute))
  const endTime = new Date(0, 0, 0, Number(endHour), Number(endMinute))
  const timeArray: string[] = []

  while (currentTime < endTime) {
    const hours = currentTime.getHours().toString().padStart(2, '0')
    const minutes = currentTime.getMinutes().toString().padStart(2, '0')
    timeArray.push(`${hours}:${minutes}`)
    currentTime.setMinutes(currentTime.getMinutes() + 30)
  }

  return timeArray
}

export const generateTimeArrayByDuration = (start: string, duration: number): string[] => {
  if (isTimeValidExact(start) === false) throw new Error('Invalid time')

  if (Object.values(Duration).includes(duration) === false) throw new Error('Invalid duration')

  const [startHour, startMinute] = start.split(':').map(Number)
  const startTime = new Date(0, 0, 0, startHour, startMinute)
  const timeArray: string[] = []

  for (let i = 0; i < duration; i += 30) {
    const hours = startTime.getHours().toString().padStart(2, '0')
    const minutes = startTime.getMinutes().toString().padStart(2, '0')
    timeArray.push(`${hours}:${minutes}`)
    startTime.setMinutes(startTime.getMinutes() + 30)
  }

  return timeArray
}

export const generateTimeArrayFree = (start: string, end: string, ...timeArrays: string[][]): string[] => {
  if (isTimeValidExact(start) === false || isTimeValidExact(end) === false) throw new Error('Invalid time')
  const allTimes = generateTimeArrayByRange(start, end)
  const bookedTimes = new Set(timeArrays.flat())
  bookedTimes.forEach((time) => {
    if (!isTimeValidExact(time)) throw new Error('Invalid time')
  })
  return allTimes.filter((time) => !bookedTimes.has(time))
}
