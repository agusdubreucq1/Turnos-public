export const isTimeValid = (time: string): boolean => {
  const regex = /^(0?[0-9]|1\d|2[0-3]):(0?[0-9]|[1-5]\d)$/

  return regex.test(time)
}

export const isTimeValidExact = (time: string): boolean => {
  const regex = /^(0?[0-9]|1\d|2[0-3]):(00|30)$/

  return regex.test(time)
}

export const isDateValid = (date: string): boolean => {
  const regex = /^\d{4}(-|\/)\d{2}(-|\/)\d{2}$/

  const newDate = new Date(date)
  return !isNaN(newDate.getTime()) && regex.test(date)
}

export const isBiggerThan = (bigger: string, small: string): boolean => {
  if (!isTimeValid(bigger) || !isTimeValid(small)) throw new Error('Invalid time')
  const timeBigger = Number(bigger.split(':').join(''))
  const timeSmall = Number(small.split(':').join(''))

  return timeBigger > timeSmall
}

// export const differenceTimeInMinutes = (a: string, b: string): number => {
//   if (!isTimeValid(a) || !isTimeValid(b)) throw new Error('Invalid time')
//   const timeA = Number(a.split(':').join(''))
//   const timeB = Number(b.split(':').join(''))

// const hs = Math.floor((timeA - timeB) / 60)

//   return
// }
