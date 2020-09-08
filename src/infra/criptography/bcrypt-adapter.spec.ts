import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => resolve('rash'))
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('Should call bcryot with correct values', async () => {
    const sut = makeSut()
    const hashSppy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSppy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a rah o success', async () => {
    const sut = makeSut()
    const rash = await sut.encrypt('any_value')
    expect(rash).toBe('rash')
  })

  test('Should throw if bcrypt throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })
})
