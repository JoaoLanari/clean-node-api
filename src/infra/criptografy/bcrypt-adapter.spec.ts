import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

describe('Bcrypt Adapter', () => {
  test('Should call bcryot with correct values', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashSppy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSppy).toHaveBeenCalledWith('any_value', salt)
  })
})
