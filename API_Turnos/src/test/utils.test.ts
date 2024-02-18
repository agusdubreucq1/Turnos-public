import { isBiggerThan, isDateValid, isTimeValid } from '../utils/date'
import { validMail } from '../utils/mail'

describe('first time posible', () => {
  test('00:00', () => {
    const time = '00:00'
    expect(isTimeValid(time)).toBe(true)
  })

  test('isTimeValid', () => {
    const time = '12:01'
    expect(isTimeValid(time)).toBe(true)
  })

  test('when the hours are overflowing', () => {
    const time = '25:02'
    expect(isTimeValid(time)).toBe(false)
  })

  test('when the minutes are overflowing', () => {
    const time = '00:60'
    expect(isTimeValid(time)).toBe(false)
  })

  test('when the minutes are overflowing', () => {
    const time = '00:70'
    expect(isTimeValid(time)).toBe(false)
  })

  test('when the minutes arent overflowing', () => {
    const time = '00:59'
    expect(isTimeValid(time)).toBe(true)
  })

  test('when the hours are overflowing', () => {
    const time = '24:00'
    expect(isTimeValid(time)).toBe(false)
  })

  test('last time posible', () => {
    const time = '23:59'
    expect(isTimeValid(time)).toBe(true)
  })
})

describe('is date valid', () => {
  test('2024-01-01', () => {
    expect(isDateValid('2024-01-01')).toBe(true)
  })

  test('2024-50-50', () => {
    expect(isDateValid('2024-50-50')).toBe(false)
  })

  test('2024/05/05', () => {
    expect(isDateValid('2024/05/05')).toBe(true)
  })

  test('2023-01-10T00:00:00.000Z', () => {
    expect(isDateValid('2023-01-10T00:00:00.000Z')).toBe(false)
  })

  test('2023-01-10T00:00', () => {
    expect(isDateValid('2023-01-10T00:00')).toBe(false)
  })

  test('cualquier cosa', () => {
    expect(isDateValid('cualquier cosa')).toBe(false)
  })
})

describe('bigger than', () => {
  test('is bigger than', () => {
    const time1 = '00:01'
    const time2 = '00:00'
    expect(isBiggerThan(time1, time2)).toBe(true)
  })

  test('error', () => {
    const time1 = '25:01'
    const time2 = '00:00'
    const funcionError = (): void => {
      isBiggerThan(time1, time2)
    }
    expect(funcionError).toThrow()
  })

  test('is smaller than', () => {
    const time1 = '12:01'
    const time2 = '13:00'
    expect(isBiggerThan(time1, time2)).toBe(false)
  })

  test('error', () => {
    const funcionError = (): void => {
      throw new Error('Error')
    }
    expect(funcionError).toThrow()
  })
})

describe('mail validation', () => {
  test('valid mail', async () => {
    const value = await validMail('qVnZL@example.com')
    expect(value).toBe(false)
  })

  test('valid mail', async () => {
    const value = await validMail('dubreucq02@gmail.com')
    expect(value).toBe(true)
  })
})
