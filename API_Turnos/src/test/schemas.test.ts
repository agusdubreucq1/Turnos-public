import { loginSchema, registerSchema } from '../schemas/login'
import { reservationSchema } from '../schemas/reservation'

describe('login schema', () => {
  test('login without email', () => {
    const fn = () => {
      loginSchema.parse({
        password: '12345678',
      })
    }
    expect(fn).toThrow('Email is required')
  })

  test('login incorrect email', () => {
    const fn = () => {
      loginSchema.parse({
        email: 'dubreucq02@gmail.com',
      })
    }
    expect(fn).toThrow('Password is required')
  })

  test('login incorrect email', () => {
    const fn = () => {
      loginSchema.parse({
        email: 'dubreucq02gmail.com',
        password: '12345678',
      })
    }
    expect(fn).toThrow('Invalid email')
  })

  test('login correct', () => {
    const fn = () => {
      loginSchema.parse({
        email: 'dubreucq02@gmail.com',
        password: '12345678',
      })
    }
    expect(fn).not.toThrow()
  })
})

describe('register schema', () => {
  test('register incorrect password', async () => {
    const fn = async () => {
      await registerSchema.parseAsync({
        email: 'dubreucq02@gmail.com',
        name: 'agustin',
        password: '1234',
      })
    }
    await expect(fn).rejects.toThrow('Password must be at least 6 characters')
  })

  test('register incorrect email', async () => {
    const fn = async () => {
      await registerSchema.parseAsync({
        email: 'dubreucq02gmail.com',
        name: 'agustin',
        password: '12345678',
      })
    }
    await expect(fn).rejects.toThrow('Invalid email')
  })

  test('register without name', async () => {
    const fn = async () => {
      await registerSchema.parseAsync({
        email: 'dubreucq02@gmail.com',
        password: '1234',
      })
    }
    await expect(fn).rejects.toThrow('Name is required')
  })

  test('register without password', async () => {
    const fn = async () => {
      await registerSchema.parseAsync({
        email: 'dubreucq02@gmail.com',
        name: 'agustin',
      })
    }
    await expect(fn).rejects.toThrow('Password is required')
  })

  test('register without email', async () => {
    const fn = async () => {
      await registerSchema.parseAsync({
        name: 'agustin',
        password: '12345678',
      })
    }
    await expect(fn).rejects.toThrow('Email is required')
  })
})

describe('reservation schema', () => {
  test('reservation without date', async () => {
    const fn = async () => {
      await reservationSchema.parseAsync({
        canchaId: 1,
        userId: 1,
        time: '10:00',
        duracion: 30,
        status: 'pending',
      })
    }
    await expect(fn).rejects.toThrow('Date is required')
  })

  test('reservation without canchaId', async () => {
    const fn = async () => {
      await reservationSchema.parseAsync({
        date: '2022-01-01',
        userId: 1,
        time: '10:00',
        duracion: 30,
        status: 'pending',
      })
    }
    await expect(fn).rejects.toThrow('Cancha is required')
  })

  test('reservation without userId', async () => {
    const fn = async () => {
      await reservationSchema.parseAsync({
        date: '2022-01-01',
        canchaId: 1,
        time: '10:00',
        duracion: 30,
        status: 'pending',
      })
    }
    await expect(fn).rejects.toThrow('User is required')
  })

  test('reservation without time', async () => {
    const fn = async () => {
      await reservationSchema.parseAsync({
        date: '2022-01-01',
        canchaId: 1,
        userId: 1,
        duration: 30,
        status: 'pending',
      })
    }
    await expect(fn).rejects.toThrow('Time is required')
  })

  test('reservation without duration', async () => {
    const fn = async () => {
      await reservationSchema.parseAsync({
        date: '2022-01-01',
        canchaId: 1,
        userId: 1,
        time: '10:00',
        status: 'pending',
      })
    }
    await expect(fn).rejects.toThrow('Duration is required')
  })

  // error de tipos
  describe('data error', () => {
    test('error date', async () => {
      const fn = async () => {
        await reservationSchema.parseAsync({
          date: '2022-01-',
          canchaId: 1,
          userId: 1,
          time: '10:00',
          duration: 30,
          status: 'pending',
        })
      }
      await expect(fn).rejects.toThrow('Invalid Date')
    })

    test('error canchaId', async () => {
      const fn = async () => {
        await reservationSchema.parseAsync({
          date: '2022-01-01',
          canchaId: '1',
          userId: 1,
          time: '10:00',
          duration: 30,
          status: 'pending',
        })
      }
      await expect(fn).rejects.toThrow('Invalid Cancha')
    })

    test('error user', async () => {
      const fn = async () => {
        await reservationSchema.parseAsync({
          date: '2022-01-01',
          canchaId: 1,
          userId: '1',
          time: '10:00',
          duration: 30,
          status: 'pending',
        })
      }
      await expect(fn).rejects.toThrow('Invalid User')
    })

    test('error time', async () => {
      const fn = async () => {
        await reservationSchema.parseAsync({
          date: '2022-01-01',
          canchaId: 1,
          userId: 1,
          time: '10',
          duration: 30,
          status: 'pending',
        })
      }
      await expect(fn).rejects.toThrow('Invalid Time')
    })

    test('error duration', async () => {
      const fn = async () => {
        await reservationSchema.parseAsync({
          date: '2022-01-01',
          canchaId: 1,
          userId: 1,
          time: '10:00',
          duration: 50,
          status: 'pending',
        })
      }
      await expect(fn).rejects.toThrow('Invalid Duration')
    })

    test('error status', async () => {
      const fn = async () => {
        await reservationSchema.parseAsync({
          date: '2022-01-01',
          canchaId: 1,
          userId: 1,
          time: '10:30',
          duration: 30,
          status: 'pendiente',
        })
      }
      await expect(fn).rejects.toThrow()
    })
  })
})
