import { LoginController } from './login'
import { badRequest } from '../../helpers/http-helper'
import { MissingParamError, InvalidParamError } from '../../erros'
import { EmailValidator } from '../signup/signup-protocols'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

interface SutTypes {
  sut: LoginController
  emailValidatorSub: EmailValidator
}

const makeSut = (): SutTypes => {
  const emailValidatorSub = makeEmailValidator()
  const sut = new LoginController(emailValidatorSub)
  return {
    sut,
    emailValidatorSub
  }
}

describe('Login Controller', () => {
  test('Shoould return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Shoould return 400 if no passord is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_mail@mail.com'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  test('Shoould return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorSub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorSub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        email: 'any_mail@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })

  test('Shoould call email validator with correct email', async () => {
    const { sut, emailValidatorSub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorSub, 'isValid')
    const httpRequest = {
      body: {
        email: 'any_mail@mail.com',
        password: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('any_mail@mail.com')
  })
})
