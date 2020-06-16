import { HttpRespose } from '../protocols/http'

export const badRequest = (error: Error): HttpRespose => ({
  statusCode: 400,
  body: error
})
