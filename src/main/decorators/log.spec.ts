import { LogControllerDecorator } from './log'
import { Controller, HttpRequest, HttpRespose } from '../../presentation/protocols'
import { resolve } from 'path'

describe('LogController Decorator', () => {
  test('Should call controller handle ', async () => {
    class ControllerStub implements Controller {
      async handle (httpRequest: HttpRequest): Promise<HttpRespose> {
        const httpRespose: HttpRespose = {
          statusCode: 200,
          body: {
            name: 'any_name',
            email: 'any_email',
            password: 'any_password'
          }
        }
        return new Promise(resolve => resolve(httpRespose))
      }
    }
    const controllerStub = new ControllerStub()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const sut = new LogControllerDecorator(controllerStub)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
})
