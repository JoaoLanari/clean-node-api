import { Controller, HttpRequest, HttpRespose } from '../../protocols'
import { badRequest } from '../../helpers/http-helper'
import { MissingParamError } from '../../erros'

export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpRespose> {
    if (!httpRequest.body.email) {
      return new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
    }
    if (!httpRequest.body.password) {
      return new Promise(resolve => resolve(badRequest(new MissingParamError('password'))))
    }
  }
}
