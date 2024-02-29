import { duration } from '../const/reservations'
import { Duration } from '../enum'

export const dateFormat = (date: Date) => {
  return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`
}

export const isTimeValidExact = (time: string): boolean => {
  const regex = /^(0?[0-9]|1\d|2[0-3]):(00|30)$/

  return regex.test(time)
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

export const durationsEnabled = (time: string, timesEnableds: string[]) => {
  const timeArray = generateTimeArrayByDuration(time, duration[duration.length - 1].value)
  const response = []
  for (let i = 0; i < timeArray.length; i++) {
    if (timesEnableds.includes(timeArray[i])) {
      response.push(duration[i])
    } else {
      return response
    }
  }

  return response
}
