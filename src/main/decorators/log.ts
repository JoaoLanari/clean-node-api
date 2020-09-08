import { Controller, HttpRequest, HttpRespose } from '../../presentation/protocols'
import { LogErrorRepository } from '../../data/protocols/db/log-error-repository'

export class LogControllerDecorator implements Controller {
  private readonly controller: Controller
  private readonly logErrorRepository: LogErrorRepository

  constructor (controller: Controller, logErrorRepository: LogErrorRepository) {
    this.controller = controller
    this.logErrorRepository = logErrorRepository
  }

  async handle (httpRequest: HttpRequest): Promise<HttpRespose> {
    const httpRespose = await this.controller.handle(httpRequest)
    if (httpRespose.statusCode === 500) {
      await this.logErrorRepository.logError(httpRespose.body.stack)
    }
    return httpRespose
  }
}
