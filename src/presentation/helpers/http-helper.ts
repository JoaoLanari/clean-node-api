import { HttpRespose } from '../protocols/http'
import { ServerError } from '../erros/server-error'

export const badRequest = (error: Error): HttpRespose => ({
  statusCode: 400,
  body: error
})

export const serverError = (): HttpRespose => ({
  statusCode: 500,
  body: new ServerError()
})
