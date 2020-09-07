import { HttpRespose } from '../protocols/http'
import { ServerError } from '../erros'

export const badRequest = (error: Error): HttpRespose => ({
  statusCode: 400,
  body: error
})

export const serverError = (error: Error): HttpRespose => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const ok = (data: any): HttpRespose => ({
  statusCode: 200,
  body: data
})
