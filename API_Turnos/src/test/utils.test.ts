import { isBiggerThan, isDateValid, isTimeValid } from '../utils/date'
import { validMail } from '../utils/mail'
import {
  generateTimeArrayByDuration,
  generateTimeArrayByRange,
  generateTimeArrayFree,
  isRangeFree,
} from '../utils/time'

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

describe('generate array time', () => {
  test('generate array time', () => {
    expect(generateTimeArrayByRange('00:00', '01:00')).toEqual(['00:00', '00:30'])
  })

  test('generate array time', () => {
    expect(generateTimeArrayByRange('08:00', '10:00')).toEqual(['08:00', '08:30', '09:00', '09:30'])
  })

  test('time not valid', () => {
    const fn = (): void => {
      generateTimeArrayByRange('01:00', '00:00')
    }
    expect(fn).toThrow()
  })

  test('wrong parameters', () => {
    const fn = (): void => {
      generateTimeArrayByRange('12', '12,4')
    }
    expect(fn).toThrow()
  })

  test('generate by duration', () => {
    expect(generateTimeArrayByDuration('00:00', 30)).toEqual(['00:00'])
  })

  test('generate by duration', () => {
    expect(generateTimeArrayByDuration('00:00', 60)).toEqual(['00:00', '00:30'])
  })

  test('generate by duration', () => {
    expect(generateTimeArrayByDuration('00:00', 90)).toEqual(['00:00', '00:30', '01:00'])
  })

  test('generate by duration', () => {
    expect(generateTimeArrayByDuration('00:00', 120)).toEqual(['00:00', '00:30', '01:00', '01:30'])
  })

  test('generate by duration', () => {
    const fn = () => {
      generateTimeArrayByDuration('00:00', 110)
    }
    expect(fn).toThrow()
  })

  test('generate by duration', () => {
    const fn = () => {
      generateTimeArrayByDuration('00:12', 120)
    }
    expect(fn).toThrow()
  })
})

describe('get Time array free', () => {
  test('get Time array free', () => {
    const timeArray = generateTimeArrayFree('00:00', '01:00', ['00:00', '00:30', '01:00', '01:30'])
    expect(timeArray).toEqual([])
  })

  test('get Time array free', () => {
    const timeArray = generateTimeArrayFree('08:00', '12:00', ['08:00', '08:30'], ['10:30', '11:00'])
    expect(timeArray).toEqual(['09:00', '09:30', '10:00', '11:30'])
  })

  test('get Time array free', () => {
    const fn = () => {
      generateTimeArrayFree('13:00', '12:00', ['08:00', '08:30'], ['10:30', '11:00'])
    }
    expect(fn).toThrow()
  })

  test('get Time array free', () => {
    const fn = () => {
      generateTimeArrayFree('11:00', '12:00', ['08:20', '08:30'], ['10:30', '11:00'])
    }
    expect(fn).toThrow()
  })

  test('get Time array free', () => {
    const fn = () => {
      generateTimeArrayFree('13:00', '12', ['08:00', '08:30'], ['10:30', '11:00'])
    }
    expect(fn).toThrow()
  })
})

describe('istimefree', () => {
  test('istimefree', () => {
    const freeTime = generateTimeArrayByRange('08:00', '12:00')
    const range = ['09:00', '09:30', '10:00']
    expect(isRangeFree(range, freeTime)).toBe(true)
  })

  test('istimefree', () => {
    const freeTime = generateTimeArrayFree('08:00', '12:00', ['08:00', '08:30'], ['10:00', '10:30'])
    const range = ['09:00', '09:30', '10:00']
    expect(isRangeFree(range, freeTime)).toBe(false)
  })

  test('istimefree', () => {
    const freeTime = [
      '08:00',
      '08:30',
      '09:00',
      '09:30',
      '10:00',
      '10:30',
      '11:00',
      '11:30',
      '12:00',
      '12:30',
      '13:00',
      '13:30',
      '14:00',
      '14:30',
      '15:00',
      '15:30',
      '16:00',
      '16:30',
      '17:00',
      '17:30',
      '18:00',
      '18:30',
      '19:00',
      '19:30',
      '20:00',
      '20:30',
    ]
    const range = ['09:00', '09:30', '10:00']
    expect(isRangeFree(range, freeTime)).toBe(true)
  })
})
