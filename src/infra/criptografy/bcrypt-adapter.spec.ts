import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => resolve('rash'))
  }
}))

describe('Bcrypt Adapter', () => {
  test('Should call bcryot with correct values', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashSppy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSppy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a rah o success', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const rash = await sut.encrypt('any_value')
    expect(rash).toBe('rash')
  })
})
